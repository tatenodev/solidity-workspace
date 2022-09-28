// interface Window {
//   ethereum: BaseProvider;
// }
import { BaseProvider } from "@metamask/providers";

// // https://zenn.dev/thanai/scraps/4c94c04bdc8373
declare global {
  interface Window {
    ethereum: BaseProvider;
  }
}
