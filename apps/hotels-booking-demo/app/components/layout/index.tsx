import { ScrollArea, ThemeRoot } from "@slashid/ui";
import ContextPanel from "../context-panel";
import Footer from "../footer";
import Navbar from "../navbar";
import {
  mainContent,
  mainContentViewport,
  mainContentWrapper,
  pageWrapper,
  scrollAreaWrapper,
} from "./style.css";
import ToastContainer from "./toast-container";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={pageWrapper}>
      <div className={mainContentWrapper}>
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

export default Layout;
