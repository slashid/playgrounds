// components
import { Badge } from "./badge";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "./button";
import { LinkButton } from "./button/link-button";
import { ToggleButton } from "./button/toggle-button";
import { Collapsible } from "./collapsible";
import { Divider } from "./divider";
import { Dropdown } from "./dropdown";
import { DropdownMenu } from "./dropdown-menu";
import { ExternalLink } from "./external-link";
import { Form } from "./form";
import { Header } from "./header";
import { AlertCircle } from "./icon/alert-circle";
import { Chat } from "./icon/chat";
import { Check } from "./icon/check";
import { CheckOnly } from "./icon/check-only";
import { Close } from "./icon/close";
import { Collapse } from "./icon/collapse";
import { Email } from "./icon/email";
import { Expand } from "./icon/expand";
import { Eye } from "./icon/eye";
import { Pencil } from "./icon/pencil";
import { ShoppingCart } from "./icon/shopping-cart";
import { SlashID } from "./icon/slashid";
import { User } from "./icon/user";
import { ArrowRight } from "./icon/arrow-right";
import { Input } from "./input";
import Panel from "./panel";
import { Popover } from "./popover";
import { RadioGroup } from "./radio-group";
import { ScrollArea } from "./scroll-area";
import { SlashAnimation } from "./slash-animation";
import { Circle } from "./spinner/circle";
import { Spinner } from "./spinner/spinner";
import { Stack } from "./stack";
import { Tabs } from "./tabs";
import { Text } from "./text";
import { Toast } from "./toast";

// theme
import { centered, Sprinkles, stack } from "./theme/sprinkles.css";
import { ThemeRoot } from "./theme/theme-root";
import {
  autoTheme,
  colors,
  darkTheme,
  darkThemeColors,
  lightTheme,
  lightThemeColors,
  publicVariables,
  theme,
  themeClass,
} from "./theme/theme.css";

const vanillaExtract = {
  centered,
  stack,
  colors,
  darkTheme,
  autoTheme,
  lightTheme,
  lightThemeColors,
  darkThemeColors,
  publicVariables,
  theme,
  themeClass,
};

// TODO export icons as needed
export {
  AlertCircle,
  Badge,
  Breadcrumbs,
  Button,
  Chat,
  Check,
  CheckOnly,
  Circle,
  Close,
  Collapse,
  Collapsible,
  Divider,
  Dropdown,
  DropdownMenu,
  Email,
  Expand,
  ExternalLink,
  Eye,
  Form,
  Header,
  Input,
  LinkButton,
  Panel,
  Pencil,
  Popover,
  RadioGroup,
  ScrollArea,
  ShoppingCart,
  SlashAnimation,
  SlashID,
  Spinner,
  Stack,
  Tabs,
  Text,
  ThemeRoot,
  Toast,
  ToggleButton,
  User,
  vanillaExtract,
  ArrowRight,
};

export type { Sprinkles };
