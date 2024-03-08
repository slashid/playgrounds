import { useSlashID } from "@slashid/react";
import type { User } from "@slashid/slashid";
import { ExternalLink, Text } from "@slashid/ui";
import React from "react";
import { Action } from "~/domain/user/constants";
import type { ActionType } from "~/domain/user/types";
import { getLastAuthenticationMethod } from "~/domain/user/user";

type MessageTextProps = {
  children: React.ReactNode;
  as?: "p" | "span";
};

const MessageText: React.FC<MessageTextProps> = ({ children, as = "p" }) => {
  return (
    <Text as={as} variant={{ size: "sm", weight: "medium", color: "contrast" }}>
      {children}
    </Text>
  );
};

const methodToLinkMap: Record<string, string> = {
  webauthn:
    "https://developer.slashid.dev/docs/access/sdk#register-a-new-user-with-passkeys-webauthn",
  email_link:
    "https://developer.slashid.dev/docs/access/sdk#register-a-new-user-with-a-magic-link",
  oidc: "https://developer.slashid.dev/docs/access/sdk#register-a-new-user-with-sso",
};

const getAuthMethodLinkFromUser = (user: User) => {
  const method = getLastAuthenticationMethod(user);
  return methodToLinkMap[method];
};

const SignUpMessage = () => {
  const { user } = useSlashID();

  const link = getAuthMethodLinkFromUser(user!);

  return (
    <MessageText>
      A call to{" "}
      <ExternalLink href={link}>
        <MessageText as="span">SlashID.id</MessageText>
      </ExternalLink>{" "}
      was made in order to get a SlashID user token. A new{" "}
      <ExternalLink href="https://developer.slashid.dev/docs/api/core/create-new-person">
        <MessageText as="span">Person</MessageText>
      </ExternalLink>{" "}
      was created.
      <br />
      <br />
      The{" "}
      <ExternalLink href="https://developer.slashid.dev/docs/access/sdk/classes/User">
        <MessageText as="span">User</MessageText>
      </ExternalLink>{" "}
      class exposes useful methods built on top of the user token.
    </MessageText>
  );
};

const SignInMessage = () => (
  <MessageText>
    A call to{" "}
    <ExternalLink href="https://developer.slashid.dev/docs/access/sdk#login-a-registered-user">
      <MessageText as="span">SlashID.id</MessageText>
    </ExternalLink>{" "}
    was made in order to get a SlashID user token. Read more about SlashID
    tokens{" "}
    <ExternalLink href="https://developer.slashid.dev/docs/concepts/token_containers">
      <MessageText as="span">here</MessageText>
    </ExternalLink>
    .
    <br />
    <br />
    The{" "}
    <ExternalLink href="https://developer.slashid.dev/docs/access/sdk/classes/User">
      <MessageText as="span">User</MessageText>
    </ExternalLink>{" "}
    class exposes useful methods built on top of the user token.
  </MessageText>
);

const ActionToChangedAttributesMap: Partial<Record<ActionType, string[]>> = {
  [Action.CART_ITEM_ADDED]: ["cartItems"],
  [Action.CART_ITEM_UPDATED]: ["cartItems"],
  [Action.CART_ITEM_DELETED]: ["cartItems"],
  [Action.SHIPPING_DETAILS_UPDATED]: ["shippingDetails"],
  [Action.PAYMENT_DETAILS_UPDATED]: ["paymentDetails"],
  [Action.ORDER_COMPLETED]: ["cartItems", "orders"],
  [Action.MFA_THRESHOLD_UPDATED]: ["mfaThreshold"],
};

type Props = {
  action: ActionType;
};

const DefaultMessage: React.FC<Props> = ({ action }) => {
  const attributes = ActionToChangedAttributesMap[action] || [];

  return (
    <MessageText>
      This action is based on the User attributes API - a secure, user bound PII
      data store.
      <br />
      <br />A call to the{" "}
      <ExternalLink href="https://developer.slashid.dev/docs/access/sdk/classes/Types.Bucket#set">
        <MessageText as="span">Bucket.set</MessageText>
      </ExternalLink>{" "}
      method was used to store the following attributes:{" "}
      <span style={{ fontStyle: "italic" }}> {attributes.join(", ")} </span>
      .
      <br />
      <br />
      Check the{" "}
      <ExternalLink href="https://developer.slashid.dev/docs/access/sdk#working-with-user-attributes">
        <MessageText as="span">docs</MessageText>
      </ExternalLink>{" "}
      for more information on how to use it.
    </MessageText>
  );
};

const ActionItemMessage: React.FC<Props> = ({ action }) => {
  if (action === Action.SIGN_UP) return <SignUpMessage />;
  if (action === Action.SIGN_IN) return <SignInMessage />;
  return <DefaultMessage action={action} />;
};

export default ActionItemMessage;
