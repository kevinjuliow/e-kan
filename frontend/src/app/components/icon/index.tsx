interface IconProperties {
  hexColor: string
  size: number
}

export const Shop = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10" stroke={hexColor} strokeWidth="1.5"></path>
    <path d="M14.8333 21V15C14.8333 13.8954 13.9379 13 12.8333 13H10.8333C9.72874 13 8.83331 13.8954 8.83331 15V21" stroke={hexColor} strokeWidth="1.5" strokeMiterlimit="16"></path>
    <path d="M21.8183 9.36418L20.1243 3.43517C20.0507 3.17759 19.8153 3 19.5474 3H15.5L15.9753 8.70377C15.9909 8.89043 16.0923 9.05904 16.2532 9.15495C16.6425 9.38698 17.4052 9.81699 18 10C19.0158 10.3125 20.5008 10.1998 21.3465 10.0958C21.6982 10.0526 21.9157 9.7049 21.8183 9.36418Z" stroke={hexColor} strokeWidth="1.5"></path>
    <path d="M14 10C14.5675 9.82538 15.2879 9.42589 15.6909 9.18807C15.8828 9.07486 15.9884 8.86103 15.9699 8.63904L15.5 3H8.5L8.03008 8.63904C8.01158 8.86103 8.11723 9.07486 8.30906 9.18807C8.71207 9.42589 9.4325 9.82538 10 10C11.493 10.4594 12.507 10.4594 14 10Z" stroke={hexColor} strokeWidth="1.5"></path>
    <path d="M3.87567 3.43517L2.18166 9.36418C2.08431 9.7049 2.3018 10.0526 2.6535 10.0958C3.49916 10.1998 4.98424 10.3125 6 10C6.59477 9.81699 7.35751 9.38698 7.74678 9.15495C7.90767 9.05904 8.00913 8.89043 8.02469 8.70377L8.5 3H4.45258C4.18469 3 3.94926 3.17759 3.87567 3.43517Z" stroke={hexColor} strokeWidth="1.5"></path>
  </svg>
)

export const Plus = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const Minus = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M6 12H18" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const PlusNonSolid = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M9 12H12M15 12H12M12 12V9M12 12V15" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const PlusSolid = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor} strokeWidth="1.5">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.6 2.25C2.85442 2.25 2.25 2.85441 2.25 3.6V20.4C2.25 21.1456 2.85441 21.75 3.6 21.75H20.4C21.1456 21.75 21.75 21.1456 21.75 20.4V3.6C21.75 2.85442 21.1456 2.25 20.4 2.25H3.6ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9V11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15V12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill={hexColor}></path>
  </svg>
)

export const MinusNonSolid = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M9 12H12H15" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const MinusSolid = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor} strokeWidth="1.5">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.6 2.25C2.85442 2.25 2.25 2.85441 2.25 3.6V20.4C2.25 21.1456 2.85441 21.75 3.6 21.75H20.4C21.1456 21.75 21.75 21.1456 21.75 20.4V3.6C21.75 2.85442 21.1456 2.25 20.4 2.25H3.6ZM9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H12H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12H9Z" fill={hexColor}></path>
  </svg>
)

export const Trash = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const CartIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const CartRemoveIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M9.99219 11H13.9922" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const CartAddIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M3 6H22L19 16H6L3 6ZM3 6L2.25 3.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M9.99219 11H11.9922M13.9922 11H11.9922M11.9922 11V9M11.9922 11V13" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M11 19.5C11 20.3284 10.3284 21 9.5 21C8.67157 21 8 20.3284 8 19.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const CheckNonSolidIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}><path d="M5 13L9 17L19 7" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
)

export const CheckSolidIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor} strokeWidth="1.5">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z" fill={hexColor}></path>
  </svg>
)

export const XMarkNonSolidIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const XMarkSolidIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor} strokeWidth="1.5">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z" fill={hexColor}></path>
  </svg>
)

export const LeftArrowIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="3" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke={hexColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const RightArrowIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="3" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke={hexColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const UploadIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M12 22V13M12 13L15.5 16.5M12 13L8.5 16.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const SaveIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke={hexColor} strokeWidth="1.5"></path>
    <path d="M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z" stroke={hexColor} strokeWidth="1.5"></path>
    <path d="M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z" stroke={hexColor} strokeWidth="1.5"></path>
  </svg>
)

export const UserIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const ReceiptIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M12 11H14.5H17" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M12 7H14.5H17" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M8 15V3.6C8 3.26863 8.26863 3 8.6 3H20.4C20.7314 3 21 3.26863 21 3.6V17C21 19.2091 19.2091 21 17 21V21" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M5 15H8H12.4C12.7314 15 13.0031 15.2668 13.0298 15.5971C13.1526 17.1147 13.7812 21 17 21H8H6C4.34315 21 3 19.6569 3 18V17C3 15.8954 3.89543 15 5 15Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const PencilEditIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const HomeIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M17 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M9 17H15" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const SearchIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M17 17L21 21" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const ChatIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M8 10L12 10L16 10" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M8 14L10 14L12 14" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const ChatBubbleIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M7.5 22C10.5376 22 13 19.5376 13 16.5C13 13.4624 10.5376 11 7.5 11C4.46243 11 2 13.4624 2 16.5C2 17.5018 2.26783 18.441 2.7358 19.25L2.275 21.725L4.75 21.2642C5.55898 21.7322 6.49821 22 7.5 22Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M15.2824 17.8978C16.2587 17.7405 17.1758 17.4065 18 16.9297L21.6 17.6L20.9297 14C21.6104 12.8233 22 11.4571 22 10C22 5.58172 18.4183 2 14 2C9.97262 2 6.64032 4.97598 6.08221 8.84884" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const FishIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M10.5 9C10.5 9 10.5 7 9.5 5C13.5 5 16 7.49997 16 7.49997C16 7.49997 19.5 7 22 12C21 17.5 16 18 16 18L12 20.5C12 20.5 12 19.5 12 17.5C9.5 16.5 6.99998 14 7 12.5C7.00001 11 10.5 9 10.5 9ZM10.5 9C10.5 9 11.5 8.5 12.5 8.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2 9.5L3 12.5L2 15.5C2 15.5 7 15.5 7 12.5C7 9.5 2 9.5 2 9.5Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M17 12.01L17.01 11.9989" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const BoxIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M10 12L14 12" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M3 3L21 3" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M21 7V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V7" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const MapIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke={hexColor} strokeWidth="1.5"></path>
    <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill={hexColor} stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const BankIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M3 9.5L12 4L21 9.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M5 20H19" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M10 9L14 9" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M6 17L6 12" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M10 17L10 12" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M14 17L14 12" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M18 17L18 12" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

export const InternetIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M13 2.04932C13 2.04932 16 5.99994 16 11.9999" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M11 21.9506C11 21.9506 8 17.9999 8 11.9999C8 5.99994 11 2.04932 11 2.04932" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2.62964 15.5H12" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2.62964 8.5H21.3704" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path fillRule="evenodd" clipRule="evenodd" d="M21.8789 17.9174C22.3727 18.2211 22.3423 18.9604 21.8337 19.0181L19.2671 19.309L18.1159 21.6213C17.8878 22.0795 17.1827 21.8552 17.0661 21.2873L15.8108 15.1713C15.7123 14.6913 16.1437 14.3892 16.561 14.646L21.8789 17.9174Z" stroke={hexColor} strokeWidth="1.5"></path>
  </svg>
)

export const CopyIcon = ({ hexColor, size }: IconProperties) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color={hexColor}>
    <path d="M8.5 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4H15.5" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round"></path>
    <path d="M8 6.4V4.5C8 4.22386 8.22386 4 8.5 4C8.77614 4 9.00422 3.77604 9.05152 3.50398C9.19968 2.65171 9.77399 1 12 1C14.226 1 14.8003 2.65171 14.9485 3.50398C14.9958 3.77604 15.2239 4 15.5 4C15.7761 4 16 4.22386 16 4.5V6.4C16 6.73137 15.7314 7 15.4 7H8.6C8.26863 7 8 6.73137 8 6.4Z" stroke={hexColor} strokeWidth="1.5" strokeLinecap="round"></path>
  </svg>
)