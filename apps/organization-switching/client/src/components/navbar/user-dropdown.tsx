import { useSlashID } from "@slashid/react";
import { DropdownMenu } from "@slashid/ui";
import { dropdown, dropdownContent } from "./style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSetAtom } from "jotai";
import { Box } from "@mui/material";
import { toastAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";

export const UserDropdown = () => {
  const navigate = useNavigate()
  const setToast = useSetAtom(toastAtom);
  const { logOut, user } = useSlashID();
  const [handleFallback, setHandleFallback] = useState("-")
  const email = useMemo(
    () => {
      const authentication = user?.authentications?.[0]

      if (authentication?.method === "direct_id") return handleFallback
      return authentication?.handle.value ?? handleFallback
    },
    [user, handleFallback]
  );

  useEffect(() => {
    (async () => {
      const handles = await user?.getHandles()

      const email_address = handles?.find(handle => handle.type === "email_address")
      if (email_address) setHandleFallback(email_address.value)
    })()
  }, [user])

  const copy = useCallback(() => {
    if (!email) return;

    if (!navigator.clipboard) {
      setToast({
        type: "error",
        message: "Copy to clipboard is only available in secure contexts (https)",
      });
      return
    }

    setToast({
      type: "success",
      message: "Copied email to clipboard",
    });
    
    navigator.clipboard.writeText(email);
  }, [email, setToast]);

  const logout = useCallback(() => {
    navigate('/')

    logOut()
  }, [navigate, logOut])

  return (
    <Box
      className={dropdown}
      sx={{
        "& [data-radix-popper-content-wrapper]": {
          zIndex: 1000,
        },
      }}
    >
      <DropdownMenu
        variant="short"
        label={email}
        contentClassName={dropdownContent}
        contentProps={{
          align: "end",
          alignOffset: 5,
          side: "bottom",
          sideOffset: 10,
        }}
        items={[
          { content: "Copy email to clipboard", onClick: copy },
          { content: "Log out", onClick: logout },
        ]}
      />
    </Box>
  );
};
