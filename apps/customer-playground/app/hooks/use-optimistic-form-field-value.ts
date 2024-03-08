import { useFetchers, useNavigation } from "@remix-run/react";
import type { RoutePath } from "~/domain/paths";
import { parse } from "~/utils/utils";

/**
 * This hook returns Form Field Value that is currently being submitted to the server for a given form field name and form action.
 * Useful for layouts and parent routes that need to provide pending/optimistic UI regarding the fetch.
 */
export const useOptimisticFormFieldValue = <T>(
  fieldName: string,
  formAction?: RoutePath
): T => {
  // when submitting using useFetcher, the form data is available on the fetcher object
  const fetchers = useFetchers();

  // when submitting using useSubmit, the form data is available on the navigation object
  const navigation = useNavigation();

  // here we need to check both the fetchers and the navigation object for the form data
  const fetcher = [...fetchers, navigation].find((f) => {
    const isNotInIdleState = f.state !== "idle";
    const hasFieldName = !!f.formData?.get(fieldName);
    const hasFormAction = formAction ? f.formAction === formAction : true;

    return isNotInIdleState && hasFieldName && hasFormAction;
  });

  const fieldValue = parse(fetcher?.formData?.get(fieldName));

  return fieldValue as T;
};
