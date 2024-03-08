import { Box } from "@mui/material";
import {
  Groups,
  OrganizationSwitcher,
  useOrganizations,
  useSlashID,
} from "@slashid/react";
import { AdminControlPanel } from "../../components/admin-control-panel";
import { ADMIN } from "../../../../shared";
import { Editor } from "../../components/editor";
import { admin, createOrgButton } from "./styles.css";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PersonPoolPanel } from "../../components/context-panel/person-pool-panel";
import { InviteACollaboratorPanel } from "../../components/context-panel/invite-a-collaborator-panel";
import { UserAttributesPanel } from "../../components/context-panel/user-attributes-panel";
import { SwitchingOrgPanel } from "../../components/context-panel/switching-org-panel";
import { Button } from "@slashid/ui";
import { CreateOrgModal } from "../../components/create-org-modal";
import { contextPanelContentAtom, defaultOrgIdAtom } from "../../atoms";
import { CreateAnOrgPanel } from "../../components/context-panel/create-an-org-panel";
import { PersonalOrgPanel } from "../../components/context-panel/personal-org-panel";
import { AnotherOrgPanel } from "../../components/context-panel/another-org-panel";
import { OrganizationDetails } from "@slashid/slashid";
import JWTToken from "../../components/context-panel/jwt-token";
import { ImpersonationPanel } from "../../components/context-panel/impersonation-panel";

export const Dashboard = () => {
  const setContextPanelContent = useSetAtom(contextPanelContentAtom);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { organizations } = useOrganizations();
  const { user } = useSlashID();
  const [defaultOrgId, setDefaultOrgId] = useAtom(defaultOrgIdAtom);

  /**
   * The users "default org" can be assumed to be an org
   * where the name matches the users person_id
   *
   * This is used for context panel state only.
   */
  useEffect(() => {
    const org = organizations.find((org) => org.org_name === user?.ID);

    if (!org) return;

    setDefaultOrgId(org.id);
  }, [organizations, setDefaultOrgId, user]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh, setRefresh]);

  const isPersonalOrg = useMemo(() => {
    return defaultOrgId === user?.oid;
  }, [defaultOrgId, user?.oid]);

  useEffect(() => {
    if (!defaultOrgId) {
      setContextPanelContent(
        <>
          <ImpersonationPanel />
          <JWTToken />
        </>
      );
      return;
    }

    setContextPanelContent(
      <>
        <ImpersonationPanel />
        {isPersonalOrg ? <PersonalOrgPanel /> : <AnotherOrgPanel />}
        {isPersonalOrg && (
          <>
            <CreateAnOrgPanel />
            <SwitchingOrgPanel />
          </>
        )}
        <Groups belongsTo={(groups) => groups.includes(ADMIN)}>
          <PersonPoolPanel />
          <InviteACollaboratorPanel />
        </Groups>
        {isPersonalOrg && (
          <>
            <UserAttributesPanel />
          </>
        )}
        <JWTToken />
      </>
    );
  }, [setContextPanelContent, isPersonalOrg, defaultOrgId]);

  const renderLabel = useCallback(
    (org: OrganizationDetails) => {
      if (user?.ID === org.org_name) return "Your personal organization";
      return org.org_name;
    },
    [user?.ID]
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginBottom: "20px",
          alignItems: "center",
          "& .sid-dropdown__trigger": {
            margin: "0 !important",
          },
          "& .sid-dropdown__popover": {
            zIndex: 10,
          },
        }}
      >
        {!refresh && (
          <OrganizationSwitcher
            filter={(org) => org.id !== import.meta.env.VITE_ROOT_ORG_ID}
            renderLabel={renderLabel}
          />
        )}

        <Button
          variant="secondary"
          onClick={() => setModalOpen(true)}
          className={createOrgButton}
        >
          Create new organization
        </Button>
      </Box>
      <Editor />
      <Groups belongsTo={(groups) => groups.includes(ADMIN)}>
        <AdminControlPanel className={admin} />
      </Groups>
      <CreateOrgModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setRefresh(true);
        }}
      />
    </>
  );
};
