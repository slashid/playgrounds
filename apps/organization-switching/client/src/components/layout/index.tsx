import { ScrollArea, ThemeRoot } from "@slashid/ui";
import Navbar from "../navbar";
import ToastContainer from "../toast-container";
import {
  mainContent,
  mainContentViewport,
  mainContentWrapper,
  pageWrapper,
  scrollAreaWrapper,
} from "./layout.css";
import Footer from "../footer";
import ContextPanel from "../context-panel";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={pageWrapper}>
      <div className={mainContentWrapper} id="content">
        <Navbar />
        <ToastContainer />
        <div className={scrollAreaWrapper}>
          <ScrollArea viewportClassName={mainContentViewport} type="scroll">
            <main className={mainContent}>{children}</main>
            <Footer />
          </ScrollArea>
        </div>
      </div>
      <ThemeRoot theme="dark">
        <ContextPanel />
      </ThemeRoot>
    </div>
  );
};
