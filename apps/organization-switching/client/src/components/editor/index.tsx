import { Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LinkBubbleMenu,
  RichTextEditor,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import useExtensions from "./use-extensions";
import { EditorMenuControls } from "./editor-menu-controls";
import { Spinner, Text } from "@slashid/ui";
import { editorContainer, placeholder, savingIndicator } from "./styles.css";
import { useSlashID } from "@slashid/react";
import { useSetAtom } from "jotai";
import { useDebouncedCallback } from "use-debounce";
import { Editor as EditorAPI } from "@tiptap/react";
import { toastAtom } from "../../atoms";

export const Editor = () => {
  const setToast = useSetAtom(toastAtom);
  const { user } = useSlashID();
  const [initialContent, setInitialContent] = useState<string>("");

  useEffect(() => {
    (async () => {
      setInitialContent("");

      const headers: HeadersInit = {
        authorization: `Bearer ${user!.token}`,
        "content-type": "application/json",
      };

      const defaultContent = `<p><strong><span style="font-size: 36px">Welcome to /id notes</span></strong></p><p></p><p>Enter some text here, saving happens automatically.</p>`;
      const { content } = await fetch("/api/content", { headers }).then(
        (response) => response.json()
      );

      setInitialContent(content === null ? defaultContent : content);
    })();
  }, [user]);

  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const savedOnce = useMemo(() => loading !== undefined, [loading]);
  const extensions = useExtensions({
    placeholder: "Start writing, saving is automatic.",
  });
  const [richTextEditor, setRichTextEditor] = useState<EditorAPI>();
  const editorRef = useCallback(
    (node: RichTextEditorRef) => {
      if (!node?.editor) return;
      if (node?.editor === richTextEditor) return;

      setRichTextEditor(node?.editor);
    },
    [richTextEditor]
  );
  const onUpdate = useDebouncedCallback(
    useCallback(async () => {
      setLoading(true);

      const html = richTextEditor?.getHTML() ?? "";
      const headers: HeadersInit = {
        authorization: `Bearer ${user!.token}`,
        "content-type": "application/json",
      };

      const body: BodyInit = JSON.stringify({
        content: html,
      });

      const init: RequestInit = {
        method: "PUT",
        headers,
        body,
      };

      try {
        await fetch("/api/content", init).then((response) => {
          if (!response.ok) throw new Error(response.statusText);
        });
      } catch {
        setToast({
          type: "error",
          message: "Error saving notes",
        });
      } finally {
        setLoading(false);
      }
    }, [richTextEditor, setToast, user]),
    500
  );

  useEffect(() => {
    if (!richTextEditor) return;

    richTextEditor?.on("update", onUpdate);

    return () => {
      richTextEditor?.off("update", onUpdate);
    };
  }, [onUpdate, richTextEditor]);

  if (!initialContent) {
    return (
      <div className={placeholder}>
        <Spinner
          variant={{
            color: "primary",
          }}
        />
      </div>
    );
  }

  return (
    <div className={editorContainer}>
      <RichTextEditor
        key={user?.oid}
        ref={editorRef}
        extensions={extensions}
        content={initialContent}
        renderControls={() => <EditorMenuControls />}
        RichTextFieldProps={{
          footer: (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                borderTopStyle: "solid",
                borderTopWidth: 1,
                borderTopColor: (theme) => theme.palette.divider,
                py: 1,
                px: 1.5,
                justifyContent: "flex-end",
                minHeight: "15.67px",
              }}
            >
              {loading ? (
                <div className={savingIndicator}>
                  <Spinner variant={{ size: "small", color: "primary" }} />
                  <Text
                    variant={{
                      size: "sm",
                    }}
                  >
                    Saving...
                  </Text>
                </div>
              ) : (
                <Text
                  variant={{
                    size: "sm",
                  }}
                >
                  {savedOnce ? "Saved" : ""}
                </Text>
              )}
            </Stack>
          ),
        }}
      >
        {() => (
          <>
            <LinkBubbleMenu />
            <TableBubbleMenu />
          </>
        )}
      </RichTextEditor>
    </div>
  );
};
