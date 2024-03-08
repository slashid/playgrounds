import { ROOT_ROUTE_ID } from "~/domain/paths";
import type { ActionLog, ActionLogLoaderData } from "~/domain/user/types";
import { useOptimisticFormFieldValue } from "~/hooks/use-optimistic-form-field-value";
import { useRouteLoaderData } from "~/hooks/use-route-loader-data";

/**
 * This hook returns the optimistic action log that is currently either being submitted/loaded to/from the server.
 */
export const useOptimisticActionLogData = () => {
  const { actionLog } = useRouteLoaderData<ActionLogLoaderData>(ROOT_ROUTE_ID);
  const submittedActionLog =
    useOptimisticFormFieldValue<ActionLog>("actionLog");

  const optimisticActionLog = submittedActionLog || actionLog || [];

  return optimisticActionLog;
};
