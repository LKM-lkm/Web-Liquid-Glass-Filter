import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  MoreHorizontal,
  ListMusic,
  Radio,
  Volume2,
  Settings2,
  Droplets,
  Maximize2,
  Sun,
  Layers,
  ChevronRight,
  ChevronLeft,
  Wifi,
  Battery,
  Signal,
  Bell,
  Moon,
  Airplay,
  Bluetooth,
  LayoutGrid,
  Command,
  Clock,
  Calendar,
  Info,
  Sparkles,
  Github,
  Twitter,
  ExternalLink,
  Plane as Airplane,
  Zap,
  Timer,
  Calculator,
  Camera,
  BellOff,
  Tv,
  RefreshCw,
  Lightbulb,
  Globe,
  Link,
  Smartphone
} from 'lucide-react';
import { GlassFilter } from './components/GlassFilter';
import { HomeUI } from './components/HomeUI';

const SCENES = [
  { id: 1, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000", name: "优美山谷" },
  { id: 2, url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000", name: "迷雾山脉" },
  { id: 3, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000", name: "深邃森林" },
  { id: 4, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000", name: "高山湖泊" },
];

const UI_SCENARIOS = [
  { id: 'player', name: '音乐播放', icon: <Play className="w-3.5 h-3.5" /> },
  { id: 'control', name: '控制中心', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: 'search', name: '全局搜索', icon: <Search className="w-3.5 h-3.5" /> },
  { id: 'notification', name: '通知堆栈', icon: <Bell className="w-3.5 h-3.5" /> },
  { id: 'playground', name: '实验室', icon: <Sparkles className="w-3.5 h-3.5" /> },
];

const CustomPlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <path d="M133 440a35.37 35.37 0 0 1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0 1 35.77.45l247.85 148.36a36 36 0 0 1 0 61l-247.89 148.4A35.5 35.5 0 0 1 133 440z" />
  </svg>
);

const CustomPauseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <path d="M208 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16zm144 0h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16z" />
  </svg>
);

const CustomPrevIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <path d="m30.71 229.47 188.87-113a30.54 30.54 0 0 1 31.09-.39 33.74 33.74 0 0 1 16.76 29.47v79.05l180.72-108.16a30.54 30.54 0 0 1 31.09-.39A33.74 33.74 0 0 1 496 145.52v221A33.73 33.73 0 0 1 479.24 396a30.54 30.54 0 0 1-31.09-.39L267.43 287.4v79.08A33.73 33.73 0 0 1 250.67 396a30.54 30.54 0 0 1-31.09-.39l-188.87-113a31.27 31.27 0 0 1 0-53z" />
  </svg>
);

const CustomNextIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="currentColor">
    <path d="m481.29 229.47-188.87-113a30.54 30.54 0 0 0-31.09-.39 33.74 33.74 0 0 0-16.76 29.47v79.05L63.85 116.44a30.54 30.54 0 0 0-31.09-.39A33.74 33.74 0 0 0 16 145.52v221A33.74 33.74 0 0 0 32.76 396a30.54 30.54 0 0 0 31.09-.39L244.57 287.4v79.08A33.74 33.74 0 0 0 261.33 396a30.54 30.54 0 0 0 31.09-.39l188.87-113a31.27 31.27 0 0 0 0-53z" />
  </svg>
);

const CustomWifiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 18" fill="none" className={className}>
    <path d="M11.9141 17.2422C11.7839 17.2422 11.651 17.2031 11.5156 17.125C11.3854 17.0521 11.2161 16.9167 11.0078 16.7188L8.52344 14.3281C8.42448 14.2344 8.36198 14.1302 8.33594 14.0156C8.3099 13.8958 8.33073 13.7839 8.39844 13.6797C8.64323 13.3464 8.94792 13.0495 9.3125 12.7891C9.68229 12.5286 10.0885 12.3229 10.5312 12.1719C10.974 12.0208 11.4349 11.9453 11.9141 11.9453C12.3828 11.9453 12.8333 12.0182 13.2656 12.1641C13.7031 12.3047 14.1016 12.5 14.4609 12.75C14.8203 13 15.1224 13.2786 15.3672 13.5859C15.4609 13.7057 15.5 13.8359 15.4844 13.9766C15.4688 14.112 15.4115 14.2292 15.3125 14.3281L12.8203 16.7188C12.6172 16.9219 12.4479 17.0599 12.3125 17.1328C12.1771 17.2057 12.0443 17.2422 11.9141 17.2422ZM5.85156 11.5625L4.25781 10.0156C4.14844 9.91146 4.08854 9.79688 4.07812 9.67188C4.07292 9.54167 4.11719 9.42188 4.21094 9.3125C4.7526 8.66667 5.42188 8.09896 6.21875 7.60938C7.02083 7.11458 7.90625 6.72917 8.875 6.45312C9.84896 6.17708 10.862 6.03906 11.9141 6.03906C12.9609 6.03906 13.9688 6.17708 14.9375 6.45312C15.9115 6.72917 16.7995 7.11458 17.6016 7.60938C18.4036 8.09896 19.0729 8.66667 19.6094 9.3125C19.7031 9.42188 19.7448 9.54167 19.7344 9.67188C19.7292 9.80208 19.6719 9.91667 19.5625 10.0156L17.9688 11.5547C17.8385 11.6745 17.6979 11.737 17.5469 11.7422C17.3958 11.7422 17.263 11.6797 17.1484 11.5547C16.7214 11.1016 16.2266 10.7031 15.6641 10.3594C15.1016 10.0156 14.5 9.7474 13.8594 9.55469C13.224 9.36198 12.5755 9.26562 11.9141 9.26562C11.2578 9.26562 10.612 9.35938 9.97656 9.54688C9.34115 9.73438 8.74479 9.9974 8.1875 10.3359C7.63021 10.6745 7.14323 11.0677 6.72656 11.5156C6.59635 11.651 6.45052 11.724 6.28906 11.7344C6.1276 11.7448 5.98177 11.6875 5.85156 11.5625ZM1.60156 7.38281L0.179688 5.9375C0.0755208 5.82812 0.0182292 5.70573 0.0078125 5.57031C0.00260417 5.42969 0.046875 5.30469 0.140625 5.19531C0.760417 4.42969 1.5 3.72917 2.35938 3.09375C3.21875 2.45833 4.16406 1.91146 5.19531 1.45312C6.22656 0.989583 7.3099 0.632812 8.44531 0.382812C9.58594 0.127604 10.7422 0 11.9141 0C13.0859 0 14.2396 0.127604 15.375 0.382812C16.5104 0.638021 17.5911 0.994792 18.6172 1.45312C19.6484 1.91146 20.5938 2.45833 21.4531 3.09375C22.3177 3.72917 23.0599 4.42969 23.6797 5.19531C23.7734 5.30469 23.8177 5.42969 23.8125 5.57031C23.8073 5.70573 23.75 5.82812 23.6406 5.9375L22.2188 7.35938C22.099 7.47917 21.9583 7.54167 21.7969 7.54688C21.6406 7.54688 21.5052 7.48958 21.3906 7.375C20.1458 6.04688 18.7161 5.03906 17.1016 4.35156C15.4922 3.66406 13.763 3.32031 11.9141 3.32031C10.0703 3.32031 8.34375 3.66406 6.73438 4.35156C5.13021 5.03906 3.70312 6.04167 2.45312 7.35938C2.33333 7.48958 2.1901 7.55729 2.02344 7.5625C1.86198 7.5625 1.72135 7.5026 1.60156 7.38281Z" fill="white" />
  </svg>
);

const CustomCameraIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 30 24" fill="none" className={className}>
    <path d="M24.7891 9.57422C25.2344 9.57422 25.6117 9.4196 25.9209 9.11035C26.2363 8.79492 26.394 8.41455 26.394 7.96924C26.394 7.5363 26.2363 7.16211 25.9209 6.84668C25.6055 6.53125 25.2282 6.37354 24.7891 6.37354C24.3499 6.37354 23.9727 6.53125 23.6572 6.84668C23.3418 7.16211 23.1841 7.5363 23.1841 7.96924C23.1841 8.41455 23.3418 8.79492 23.6572 9.11035C23.9727 9.4196 24.3499 9.57422 24.7891 9.57422ZM4.08203 23.3696C2.75846 23.3696 1.74723 23.0233 1.04834 22.3306C0.349447 21.6379 0 20.6328 0 19.3154V6.7168C0 5.4056 0.349447 4.40365 1.04834 3.71094C1.74723 3.01823 2.75846 2.67188 4.08203 2.67188H6.97656C7.28581 2.67188 7.53939 2.65332 7.7373 2.61621C7.94141 2.57292 8.12695 2.4987 8.29395 2.39355C8.46094 2.28223 8.64648 2.12142 8.85059 1.91113L9.79688 0.946289C10.0195 0.723633 10.2453 0.544271 10.4741 0.408203C10.7091 0.272135 10.9689 0.170085 11.2534 0.102051C11.5441 0.0340169 11.8874 0 12.2832 0H17.3486C17.7445 0 18.0877 0.0340169 18.3784 0.102051C18.6691 0.170085 18.9289 0.272135 19.1577 0.408203C19.3866 0.544271 19.6092 0.723633 19.8257 0.946289L20.772 1.91113C20.9823 2.12142 21.1709 2.28223 21.3379 2.39355C21.5049 2.4987 21.6873 2.57292 21.8853 2.61621C22.0894 2.65332 22.346 2.67188 22.6553 2.67188H25.624C26.9414 2.67188 27.9495 3.01823 28.6484 3.71094C29.3473 4.40365 29.6968 5.4056 29.6968 6.7168V19.3154C29.6968 20.6328 29.3473 21.6379 28.6484 22.3306C27.9495 23.0233 26.9414 23.3696 25.624 23.3696H4.08203ZM14.853 19.436C15.7375 19.436 16.5662 19.269 17.3394 18.9351C18.1125 18.6073 18.7897 18.1527 19.3711 17.5713C19.9587 16.9837 20.4163 16.3034 20.7441 15.5303C21.0781 14.751 21.2451 13.916 21.2451 13.0254C21.2451 12.1348 21.0812 11.3029 20.7534 10.5298C20.4256 9.75667 19.9679 9.07633 19.3804 8.48877C18.799 7.9012 18.1187 7.44352 17.3394 7.11572C16.5662 6.78174 15.7375 6.61475 14.853 6.61475C13.9686 6.61475 13.1367 6.78174 12.3574 7.11572C11.5843 7.44352 10.904 7.9012 10.3164 8.48877C9.73503 9.07633 9.28044 9.75667 8.95264 10.5298C8.62484 11.3029 8.46094 12.1348 8.46094 13.0254C8.46094 13.916 8.62484 14.751 8.95264 15.5303C9.28044 16.3034 9.73503 16.9837 10.3164 17.5713C10.904 18.1527 11.5843 18.6073 12.3574 18.9351C13.1367 19.269 13.9686 19.436 14.853 19.436ZM14.853 17.0054C14.3026 17.0054 13.7861 16.9033 13.3037 16.6992C12.8275 16.4889 12.4069 16.2044 12.042 15.8457C11.6833 15.4808 11.3988 15.0571 11.1885 14.5747C10.9844 14.0923 10.8823 13.5758 10.8823 13.0254C10.8823 12.4749 10.9844 11.9585 11.1885 11.4761C11.3988 10.9937 11.6833 10.57 12.042 10.2051C12.4069 9.84017 12.8275 9.55566 13.3037 9.35156C13.7861 9.14746 14.3026 9.04541 14.853 9.04541C15.4035 9.04541 15.9168 9.14746 16.3931 9.35156C16.8755 9.55566 17.2961 9.84017 17.6548 10.2051C18.0197 10.57 18.3042 10.9937 18.5083 11.4761C18.7124 11.9585 18.8145 12.4749 18.8145 13.0254C18.8145 13.5758 18.7124 14.0923 18.5083 14.5747C18.3042 15.0571 18.0197 15.4808 17.6548 15.8457C17.2961 16.2044 16.8755 16.4889 16.3931 16.6992C15.9168 16.9033 15.4035 17.0054 14.853 17.0054Z" fill="white" />
  </svg>
);

const CustomAirplaneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 21" fill="none" className={className}>
    <path d="M23.4453 10.3594C23.4401 10.75 23.2734 11.1146 22.9453 11.4531C22.6224 11.7865 22.1823 12.0547 21.625 12.2578C21.0729 12.4609 20.4557 12.5625 19.7734 12.5625H15.5703C15.2839 12.5625 15.0703 12.5964 14.9297 12.6641C14.7891 12.7266 14.6302 12.849 14.4531 13.0312L7.60938 20.3516C7.38542 20.5911 7.1276 20.7109 6.83594 20.7109H5.42188C5.28646 20.7109 5.1875 20.6589 5.125 20.5547C5.06771 20.4557 5.07031 20.3385 5.13281 20.2031L8.67969 12.5781L3.46875 12.0078L1.625 15.2188C1.55208 15.3438 1.46094 15.4349 1.35156 15.4922C1.24219 15.5495 1.10677 15.5781 0.945312 15.5781H0.476562C0.335938 15.5781 0.221354 15.5365 0.132812 15.4531C0.0442708 15.3646 0 15.25 0 15.1094V5.60156C0 5.46094 0.0442708 5.34896 0.132812 5.26562C0.221354 5.17708 0.335938 5.13281 0.476562 5.13281H0.945312C1.10677 5.13281 1.24219 5.16146 1.35156 5.21875C1.46094 5.27604 1.55208 5.36719 1.625 5.49219L3.46875 8.71094L8.67969 8.14062L5.13281 0.515625C5.07031 0.375 5.06771 0.255208 5.125 0.15625C5.1875 0.0520833 5.28646 0 5.42188 0H6.83594C7.1276 0 7.38542 0.119792 7.60938 0.359375L14.4531 7.67969C14.6302 7.86198 14.7891 7.98698 14.9297 8.05469C15.0703 8.11719 15.2839 8.14844 15.5703 8.14844H19.7734C20.4557 8.14844 21.0729 8.25 21.625 8.45312C22.1823 8.65625 22.6224 8.92448 22.9453 9.25781C23.2734 9.59115 23.4401 9.95833 23.4453 10.3594Z" fill="white" />
  </svg>
);

const CustomMuteIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 25 26" fill="none" className={className}>
    <path opacity="0.9" d="M11.7822 25.7075C11.0524 25.7075 10.3999 25.5529 9.82471 25.2437C9.24951 24.9406 8.78564 24.5355 8.43311 24.0283C8.08675 23.5273 7.88883 22.9769 7.83936 22.377H15.7344C15.6787 22.9769 15.4746 23.5273 15.1221 24.0283C14.7757 24.5355 14.3149 24.9406 13.7397 25.2437C13.1646 25.5529 12.512 25.7075 11.7822 25.7075ZM2.07812 20.7163C1.44727 20.7163 0.943197 20.5462 0.565918 20.2061C0.188639 19.8659 0 19.4175 0 18.8608C0 18.4155 0.105143 17.998 0.31543 17.6084C0.525716 17.2126 0.797852 16.8353 1.13184 16.4766C1.46582 16.1178 1.81836 15.7715 2.18945 15.4375C2.42448 15.221 2.61312 14.952 2.75537 14.6304C2.90381 14.3026 3.02132 13.9377 3.10791 13.5356C3.1945 13.1274 3.26872 12.6976 3.33057 12.2461C3.39242 11.7884 3.45426 11.3215 3.51611 10.8452C3.56559 9.83708 3.68929 8.91553 3.88721 8.08057L16.5229 20.7163H2.07812ZM11.7822 0C12.6543 0 13.4119 0.262858 14.0552 0.788574C14.6984 1.30811 15.1499 1.96989 15.4097 2.77393C16.4054 3.12028 17.228 3.67074 17.8774 4.42529C18.5269 5.17985 19.0247 6.1014 19.3711 7.18994C19.7236 8.2723 19.9494 9.49072 20.0483 10.8452C20.1102 11.3215 20.1689 11.7884 20.2246 12.2461C20.2865 12.6976 20.3607 13.1274 20.4473 13.5356C20.54 13.9377 20.6606 14.3026 20.8091 14.6304C20.9575 14.952 21.1493 15.221 21.3843 15.4375C21.7492 15.7715 22.0986 16.1178 22.4326 16.4766C22.7666 16.8353 23.0387 17.2126 23.249 17.6084C23.4655 17.998 23.5737 18.4155 23.5737 18.8608C23.5737 19.4237 23.3851 19.8659 23.0078 20.1875L6.50342 3.66455C6.73844 3.47282 6.99512 3.30273 7.27344 3.1543C7.55176 3.00586 7.84554 2.87907 8.15479 2.77393C8.41455 1.96989 8.86605 1.30811 9.50928 0.788574C10.1525 0.262858 10.9102 0 11.7822 0ZM0.519531 2.56055C0.340169 2.38118 0.250488 2.15853 0.250488 1.89258C0.250488 1.62663 0.340169 1.40397 0.519531 1.22461C0.705078 1.03906 0.927734 0.949382 1.1875 0.955566C1.45345 0.955566 1.67611 1.04525 1.85547 1.22461L23.9263 23.2861C24.1118 23.4717 24.2046 23.6912 24.2046 23.9448C24.2046 24.2046 24.1118 24.4303 23.9263 24.6221C23.7531 24.8014 23.5335 24.8911 23.2676 24.8911C23.0078 24.8911 22.7852 24.8014 22.5996 24.6221L0.519531 2.56055Z" fill="#FF0000" fillOpacity="0.6" />
  </svg>
);

const CustomSignalIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 13 8" fill="none" className={className}>
    <path d="M0.669922 7.96729C0.469401 7.96729 0.307617 7.9069 0.18457 7.78613C0.0615234 7.66764 0 7.51156 0 7.31787V5.48242C0 5.28874 0.0615234 5.13265 0.18457 5.01416C0.307617 4.89567 0.469401 4.83643 0.669922 4.83643H1.5791C1.77734 4.83643 1.93799 4.89567 2.06104 5.01416C2.18408 5.13265 2.24561 5.28874 2.24561 5.48242V7.31787C2.24561 7.51156 2.18408 7.66764 2.06104 7.78613C1.93799 7.9069 1.77734 7.96729 1.5791 7.96729H0.669922ZM4.09131 7.96729C3.89079 7.96729 3.729 7.9069 3.60596 7.78613C3.48291 7.66764 3.42139 7.51156 3.42139 7.31787V4.11523C3.42139 3.92155 3.48291 3.76546 3.60596 3.64697C3.729 3.5262 3.89079 3.46582 4.09131 3.46582H5.00049C5.20101 3.46582 5.36165 3.5262 5.48242 3.64697C5.60547 3.76546 5.66699 3.92155 5.66699 4.11523V7.31787C5.66699 7.51156 5.60547 7.66764 5.48242 7.78613C5.36165 7.9069 5.20101 7.96729 5.00049 7.96729H4.09131ZM7.50928 7.96729C7.31104 7.96729 7.15039 7.9069 7.02734 7.78613C6.9043 7.66764 6.84277 7.51156 6.84277 7.31787V2.46094C6.84277 2.26725 6.9043 2.11117 7.02734 1.99268C7.15039 1.87191 7.31104 1.81152 7.50928 1.81152H8.42188C8.62012 1.81152 8.78076 1.87191 8.90381 1.99268C9.02686 2.11117 9.08838 2.26725 9.08838 2.46094V7.31787C9.08838 7.51156 9.02686 7.66764 8.90381 7.78613C8.78076 7.9069 8.62012 7.96729 8.42188 7.96729H7.50928ZM10.9341 7.96729C10.7336 7.96729 10.5718 7.9069 10.4487 7.78613C10.3257 7.66764 10.2642 7.51156 10.2642 7.31787V0.649414C10.2642 0.455729 10.3257 0.299642 10.4487 0.181152C10.5718 0.0603841 10.7336 0 10.9341 0H11.8433C12.0438 0 12.2044 0.0603841 12.3252 0.181152C12.4482 0.299642 12.5098 0.455729 12.5098 0.649414V7.31787C12.5098 7.51156 12.4482 7.66764 12.3252 7.78613C12.2044 7.9069 12.0438 7.96729 11.8433 7.96729H10.9341Z" fill="white" />
  </svg>
);

const CustomScreenMirrorIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 23" fill="none" className={className}>
    <path d="M12 0C18.6274 0 24 5.37258 24 12C24 16.6021 21.4079 20.5962 17.6055 22.6094L16.5957 20.8799C19.8054 19.2154 22 15.8653 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.865 4.19405 19.2152 7.40332 20.8799L6.39355 22.6094C2.59154 20.5961 0 16.6017 0 12C0 5.37258 5.37258 0 12 0ZM11.999 3.33301C16.7854 3.33301 20.666 7.21362 20.666 12C20.6659 15.3734 18.7368 18.2938 15.9229 19.7256L14.9141 17.9951C17.1348 16.9135 18.6659 14.6362 18.666 12C18.666 8.31819 15.6808 5.33301 11.999 5.33301C8.31744 5.33327 5.33301 8.31835 5.33301 12C5.3331 14.6364 6.86395 16.9147 9.08496 17.9961L8.0752 19.7266C5.26147 18.2948 3.3331 15.3734 3.33301 12C3.33301 7.21379 7.21287 3.33327 11.999 3.33301ZM12 7C14.7614 7 17 9.23858 17 12C17 14.0226 15.798 15.7624 14.0703 16.5498L13.0537 14.8057C14.1901 14.3787 15 13.2856 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.2852 9.80942 14.3785 10.9453 14.8057L9.92871 16.5498C8.20144 15.7622 7 14.0223 7 12C7 9.23858 9.23858 7 12 7ZM11.999 10.333C12.9192 10.333 13.6658 11.0789 13.666 11.999C13.666 12.9194 12.9194 13.666 11.999 13.666C11.0789 13.6658 10.333 12.9192 10.333 11.999C10.3333 11.079 11.079 10.3333 11.999 10.333Z" fill="white" />
  </svg>
);

export default function App() {
  const [activeScene, setActiveScene] = useState(0);
  const [isDemoStarted, setIsDemoStarted] = useState(false);
  const navigate = useNavigate();
  const [activeUI, setActiveUI] = useState('player');
  // 核心光学参数状态管理：您可以在此调整默认初始化的物理数值
  // 任何后续修改都会单向同步渲染向 GlassComponent 模型
  const [params, setParams] = useState({
    glassThickness: 60,           // 空间厚度，控制光线衰减阈值
    bezelWidth: 25,               // 倒角宽/曲率平滑半径 (上限 30 以避免反向扭曲)
    refractiveIndex: 1.52,        // 物理精确折射率 (n值，参考真实玻璃)
    blur: 4,                      // 底层散景/弥散光高斯模糊强度
    specularOpacity: 0.4,         // 高光层不透明度（明暗强度）
    specularHardness: 2,          // 高光硬度边界（数值越大越锐利锋利）
    refractionSaturation: 1.2,    // 穿透镜片的色彩折射饱和度增强
    scaleRatio: 1,                // 放大形变倍率参数
    radius: 32,                   // 外倒角 CSS 控制半径
    magnifyingScale: 0,           // 微距放大偏差（实验室专用）
    pgWidth: 300,                 // 调试用宽度
    pgHeight: 200,                // 调试用高度
    pgCircleSize: 200             // 测试圆球尺寸
  });


  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextScene = () => setActiveScene((prev) => (prev + 1) % SCENES.length);
  const prevScene = () => setActiveScene((prev) => (prev - 1 + SCENES.length) % SCENES.length);

  const handleParamChange = (key: keyof typeof params, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 overflow-hidden flex flex-col font-sans antialiased">
      {/* Background Layer: Dark premium gradient for landing, scene photo for demo */}
      {!isDemoStarted ? (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0b]">
          {/* Subtle Abstract Highlights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

          {/* Crisp, Correct Matrix Grid */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, white 0%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, white 0%, transparent 70%)'
            }}
          />
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key={SCENES[activeScene].url}
            initial={{ filter: 'blur(10px)', opacity: 0.1, scale: 1.02 }}
            animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
            exit={{ filter: 'blur(20px)', opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={SCENES[activeScene].url}
              alt="Background"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Top Navigation Bar */}
      <header className="relative z-50 w-full px-6 md:px-8 py-4 md:py-6 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex items-center gap-2.5 md:gap-3 group cursor-pointer" onClick={() => setIsDemoStarted(false)}>
            {/* logo 按钮 */}
            <GlassComponent
              id="logo-glass"
              width={32}
              height={32}
              params={{ ...params, bezelWidth: 10, scaleRatio: 0.3, blur: 0, radius: 16 }}
              sceneUrl={isDemoStarted ? SCENES[activeScene].url : undefined}
            >
              <div className="w-full h-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                <Droplets className="w-5 h-5 text-blue-400" />
              </div>
            </GlassComponent>
            <span className="text-xl font-black tracking-[-0.03em] font-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">LiquidGlass</span>
          </div>

          {/* === 顶部导航状态栏与选项卡切换 (Nav Pill) === */}
          {/* 当点击进入空间后显示 */}
          {isDemoStarted && (
            <GlassComponent
              id="nav-pill"
              width="auto"
              height={44}
              params={{
                blur: 1,
                glassThickness: 60,
                bezelWidth: 20,
                refractiveIndex: 1.2,
                refractionSaturation: 1.8,
                scaleRatio: 1.5,
                radius: 22
              }}
              sceneUrl={SCENES[activeScene].url}
            >
              {/* 这里是选项卡的实际滑动渲染与交互区域 */}
              {/* 修改这里可以定制选项卡的宽度、排版和 hover 材质 */}
              <nav className="flex items-center px-1 py-1 h-full">
                {UI_SCENARIOS.map((ui) => (
                  <button
                    key={ui.id}
                    onClick={() => setActiveUI(ui.id)}
                    className={`flex items-center gap-2 px-6 h-full rounded-full text-[13px] font-bold transition-all duration-300 ${activeUI === ui.id ? 'bg-white/50 text-white scale-100' : 'text-white/80 hover:text-white hover:bg-white/20'
                      }`}
                  >
                    <span className={activeUI === ui.id ? 'text-white' : 'text-white/60'}>{ui.icon}</span>
                    <span className={activeUI === ui.id ? 'text-white' : 'text-white/60'}>{ui.name}</span>
                  </button>
                ))}
              </nav>
            </GlassComponent>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {isDemoStarted && (
            <>
              <div className="hidden sm:flex items-center gap-5 text-white/40 font-medium text-sm">
                <Signal className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <span className="text-[11px]">88%</span>
                  <Battery className="w-5 h-5" />
                </div>
              </div>
              <button
                onClick={() => setIsControlsOpen(!isControlsOpen)}
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all shadow-lg overflow-hidden group/btn"
              >
                <Settings2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60 group-hover/btn:rotate-90 transition-transform duration-500" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {!isDemoStarted ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <HomeUI
                onStart={() => setIsDemoStarted(true)}
                onOpenDocs={() => navigate('/docs')}
                sceneUrl={SCENES[activeScene].url}
                globalParams={params}
              />
            </motion.div>
          ) : (
            <motion.div
              key="demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Scene Title with Navigation */}
              <div className="flex items-center gap-8 mb-16">
                <button onClick={prevScene} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group shadow-xl">
                  <ChevronLeft className="w-5 h-5 text-white/30 group-hover:text-white" />
                </button>
                <div className="text-center">
                  <motion.h2
                    key={SCENES[activeScene].name}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-6xl font-black tracking-tight mb-4 font-heading"
                  >
                    {SCENES[activeScene].name}
                  </motion.h2>
                  <p className="text-white/40 uppercase tracking-[0.5em] text-[10px] font-extrabold font-heading">Refraction Engine v1.2</p>
                </div>
                <button onClick={nextScene} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group shadow-xl">
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white" />
                </button>
              </div>

              {/* Dynamic UI Components */}
              <div className="relative w-full flex items-center justify-center min-h-[450px]">
                <AnimatePresence mode="wait">
                  {activeUI === 'player' && (
                    <motion.div
                      key="player-ui"
                      initial={{ scale: 0.9, opacity: 0, y: 30 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 30 }}
                      transition={{ type: "spring", damping: 28, stiffness: 350 }}
                      className="w-full flex justify-center px-8"
                    >
                      <GlassComponent
                        id="player-glass"
                        width="100%"
                        maxWidth={880}
                        height={76}
                        params={{
                          ...params,
                          radius: 38,
                          bezelWidth: 28,
                          glassThickness: 80,
                          refractiveIndex: 1.3
                        }}
                        sceneUrl={SCENES[activeScene].url}
                      >
                        <div className="flex items-center px-8 h-full justify-between gap-12">
                          {/* Left Group */}
                          <div className="flex items-center gap-6">
                            <button className="text-white/20 hover:text-white transition-colors"><Shuffle className="w-4 h-4" /></button>
                            <button className="text-white/70 hover:text-white hover:scale-110 transition-all"><CustomPrevIcon className="w-5 h-5 fill-current" /></button>
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/5"
                            >
                              {isPlaying ? <CustomPauseIcon className="w-5 h-5 fill-current" /> : <CustomPlayIcon className="w-5 h-5 fill-current ml-0.5" />}
                            </button>
                            <button className="text-white/70 hover:text-white hover:scale-110 transition-all"><CustomNextIcon className="w-5 h-5 fill-current" /></button>
                            <button className="text-white/20 hover:text-white transition-colors"><Repeat className="w-4 h-4" /></button>
                          </div>

                          {/* Center Info & Progress */}
                          <div className="flex-1 flex items-center gap-6 min-w-0">
                            <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden border border-white/10 shadow-lg flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col gap-2">
                              <div className="flex justify-between items-end">
                                <div className="truncate pr-4">
                                  <span className="text-[14px] font-bold text-white mr-2">Midnight City</span>
                                  <span className="text-[10px] text-white/30 font-medium">M83</span>
                                </div>
                                <span className="text-[9px] font-mono text-white/20 tabular-nums">02:44 / 04:03</span>
                              </div>
                              <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                                <div className="absolute inset-y-0 left-0 bg-white/40 w-[63%] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                              </div>
                            </div>
                          </div>

                          {/* Right Group */}
                          <div className="flex items-center gap-6">
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><MoreHorizontal className="w-5 h-5" /></button>
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><ListMusic className="w-5 h-5" /></button>
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><Airplay className="w-4 h-4" /></button>
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><Volume2 className="w-5 h-5" /></button>
                          </div>
                        </div>
                      </GlassComponent>
                    </motion.div>
                  )}

                  {activeUI === 'control' && (
                    <motion.div
                      key="control-ui"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="grid grid-cols-4 gap-3 w-[356px] h-[540px] pointer-events-auto"
                    >
                      <div className="col-span-2 row-span-2">
                        <GlassComponent
                          id="ctrl-conn" width={172} height={172} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 48, bezelWidth: 32 }}
                        >
                          <div className="p-4 grid grid-cols-2 gap-3 h-full">
                            <div className="w-full aspect-square rounded-full bg-white/10 text-white flex items-center justify-center shadow-lg hover:bg-white/20 transition-all cursor-pointer"><CustomAirplaneIcon className="w-8 h-8" /></div>
                            <div className="w-full aspect-square rounded-full bg-white/10 text-white flex items-center justify-center shadow-lg hover:bg-white/20 transition-all cursor-pointer"><Airplay className="w-8 h-8" /></div>
                            <div className="w-full aspect-square rounded-full bg-blue-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-400 transition-all cursor-pointer"><CustomWifiIcon className="w-8 h-8" /></div>
                            <div className="w-full aspect-square rounded-2xl bg-white/5 p-2 grid grid-cols-2 gap-1 cursor-pointer hover:bg-white/10 transition-all">
                              <div className="rounded-full bg-green-500 flex items-center justify-center"><CustomSignalIcon className="w-4 h-4" /></div>
                              <div className="rounded-full bg-blue-600 flex items-center justify-center"><Bluetooth className="w-4 h-4 text-white" /></div>
                              <div className="rounded-full bg-white/20 flex items-center justify-center"><Link className="w-4 h-4 text-white" /></div>
                              <div className="rounded-full bg-white/20 flex items-center justify-center"><Globe className="w-4 h-4 text-white" /></div>
                            </div>
                          </div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-2 row-span-2">
                        <GlassComponent
                          id="ctrl-media" width={172} height={172} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 48, bezelWidth: 32 }}
                        >
                          <div className="p-4 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden shadow-2xl border border-white/10 group-hover:scale-105 transition-transform"><img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" /></div>
                              <div className="w-8 h-8 rounded-full bg-white/10 text-blue-400 flex items-center justify-center"><Airplay className="w-5 h-5 fill-current" /></div>
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-[15px] font-black truncate tracking-tight">Midnight City</div>
                              <div className="text-[11px] text-white/40 font-bold truncate tracking-wide">M83</div>
                            </div>
                            <div className="flex items-center justify-between px-1">
                              <button className="p-1 px-2 text-white/30 hover:text-white transition-colors"><CustomPrevIcon className="w-7 h-7 fill-current" /></button>
                              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 text-white hover:scale-110 transition-transform">{isPlaying ? <CustomPauseIcon className="w-9 h-9 fill-current" /> : <CustomPlayIcon className="w-9 h-9 fill-current ml-0.5" />}</button>
                              <button className="p-1 px-2 text-white/30 hover:text-white transition-colors"><CustomNextIcon className="w-7 h-7 fill-current" /></button>
                            </div>
                          </div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-1">
                        <GlassComponent
                          id="ctrl-camera" width={80} height={80} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 24 }}
                        >
                          <div className="h-full w-full flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><CustomCameraIcon className="w-8 h-8" /></div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-1">
                        <GlassComponent
                          id="ctrl-mute" width={80} height={80} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 24 }}
                        >
                          <div className="h-full w-full flex items-center justify-center bg-white hover:bg-white/90 transition-all cursor-pointer"><CustomMuteIcon className="w-8 h-8" /></div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-1 row-span-2">
                        <GlassComponent
                          id="ctrl-brightness" width={80} height={172} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 32 }}
                        >
                          <div className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute inset-x-0 bottom-0 top-[40%] bg-white/95 shadow-[0_-2px_10px_rgba(255,255,255,0.2)]" />
                            <Sun className="w-10 h-10 relative z-10 text-yellow-500 mix-blend-difference" />
                          </div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-1 row-span-2">
                        <GlassComponent
                          id="ctrl-volume" width={80} height={172} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 32 }}
                        >
                          <div className="h-full w-full relative flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute inset-x-0 bottom-0 top-[60%] bg-white/95 shadow-[0_-2px_10px_rgba(255,255,255,0.2)]" />
                            <Volume2 className="w-10 h-10 relative z-10 text-blue-500 mix-blend-difference" />
                          </div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-2 text-white/90">
                        <GlassComponent
                          id="ctrl-focus" width={172} height={80} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 28 }}
                        >
                          <div className="h-full w-full flex items-center px-4 gap-3 hover:bg-white/10 transition-all cursor-pointer truncate">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-inner"><Moon className="w-6 h-6 text-indigo-400" /></div>
                            <div className="min-w-0">
                              <div className="text-[13px] font-black tracking-tight truncate">专注模式</div>
                              <div className="text-[10px] text-white/30 font-extrabold uppercase tracking-widest truncate">已开启</div>
                            </div>
                          </div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-2 row-span-2">
                        <GlassComponent
                          id="ctrl-home" width={172} height={172} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 48, bezelWidth: 32 }}
                        >
                          <div className="p-4 h-full flex flex-col justify-between hover:bg-white/5 transition-all cursor-pointer group">
                            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform"><Lightbulb className="w-7 h-7 text-yellow-300" /></div>
                            <div className="space-y-0.5">
                              <div className="text-[15px] font-black tracking-tight">我的家</div>
                              <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">3 个配件开启</div>
                            </div>
                          </div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-1">
                        <GlassComponent
                          id="ctrl-rotate" width={80} height={80} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 24 }}
                        >
                          <div className="h-full w-full flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><RefreshCw className="w-8 h-8 opacity-80" /></div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-1">
                        <GlassComponent
                          id="ctrl-mirror" width={80} height={80} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 24 }}
                        >
                          <div className="h-full w-full flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><CustomScreenMirrorIcon className="w-8 h-8" /></div>
                        </GlassComponent>
                      </div>

                      <div className="col-span-1">
                        <GlassComponent
                          id="ctrl-battery" width={80} height={80} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 40, bezelWidth: 24 }}
                        >
                          <div className="h-full w-full flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><Battery className="w-8 h-8 opacity-80" /></div>
                        </GlassComponent>
                      </div>
                    </motion.div>
                  )}

                  {activeUI === 'playground' && (
                    <motion.div
                      key="playground-ui"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-[600px] flex items-center justify-center pointer-events-none"
                    >
                      <div className="absolute inset-0 flex items-center justify-center gap-12 overflow-visible">
                        <motion.div
                          drag
                          dragMomentum={false}
                          className="pointer-events-auto cursor-move active:cursor-grabbing"
                          onDrag={() => {
                            // Manual update trigger for refraction offset during CSS transform drag
                            window.dispatchEvent(new Event('scroll'));
                          }}
                        >
                          <GlassComponent
                            id="pg-dynamic"
                            width={params.pgWidth}
                            height={params.pgHeight}
                            sceneUrl={SCENES[activeScene].url}
                            params={{ ...params }}
                          >
                            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                              <Sparkles className="w-8 h-8 text-blue-400 mb-3" />
                              <div className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1">液态交互实验室</div>
                              <div className="text-[10px] text-white/20">拖动组件 & 调整右侧尺寸</div>
                            </div>
                          </GlassComponent>
                        </motion.div>

                        <motion.div
                          drag
                          dragMomentum={false}
                          className="pointer-events-auto cursor-move active:cursor-grabbing translate-y-20"
                          onDrag={() => {
                            window.dispatchEvent(new Event('scroll'));
                          }}
                        >
                          <GlassComponent
                            id="pg-circle-dyn"
                            width={params.pgCircleSize}
                            height={params.pgCircleSize}
                            sceneUrl={SCENES[activeScene].url}
                            params={{ ...params, radius: params.pgCircleSize / 2 }}
                          >
                            <div className="h-full flex items-center justify-center text-white/40 font-bold uppercase tracking-widest text-[9px] drop-shadow-md">物理球体</div>
                          </GlassComponent>
                        </motion.div>

                        {/* 新增的胶囊形式组件 */}
                        <motion.div
                          drag
                          dragMomentum={false}
                          className="pointer-events-auto cursor-move active:cursor-grabbing translate-x-32 -translate-y-32"
                          onDrag={() => {
                            window.dispatchEvent(new Event('scroll'));
                          }}
                        >
                          <GlassComponent
                            id="pg-capsule-dyn"
                            width={220}
                            height={60}
                            sceneUrl={SCENES[activeScene].url}
                            params={{ ...params, radius: 30 }}
                          >
                            <div className="h-full flex items-center justify-center text-white/50 font-bold uppercase tracking-[0.2em] text-[10px] gap-2">
                              交互胶囊按钮
                            </div>
                          </GlassComponent>
                        </motion.div>
                      </div>
                      <div className="absolute bottom-0 text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Drag to discover • Precise Refraction</div>
                    </motion.div>
                  )}

                  {activeUI === 'search' && (
                    <motion.div
                      key="search-ui"
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                      <GlassComponent
                        id="search-glass"
                        width={640}
                        height={64}
                        params={{ ...params, radius: 32 }} // Perfect capsule: height/2
                        sceneUrl={SCENES[activeScene].url}
                      >
                        <div className="flex items-center px-6 h-full gap-5">
                          <Search className="w-6 h-6 text-white/60" />
                          <input
                            type="text"
                            placeholder="搜索应用、文件或更多内容..."
                            className="bg-transparent border-none outline-none text-xl w-full placeholder:text-white/40 font-semibold tracking-tight font-sans"
                            autoFocus
                          />
                          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/20 text-[11px] font-bold text-white/80 border border-white/20 shadow-sm">
                            <Command className="w-3 h-3" />
                            <span>K</span>
                          </div>
                        </div>
                      </GlassComponent>
                    </motion.div>
                  )}

                  {activeUI === 'notification' && (
                    <motion.div
                      key="notification-ui"
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 60, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                      <GlassComponent
                        id="notif-glass"
                        width={340}
                        height={140}
                        params={{ ...params, radius: 28 }}
                        sceneUrl={SCENES[activeScene].url}
                      >
                        <div className="p-6 h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg"><Clock className="w-4 h-4" /></div>
                              <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">待办事项</span>
                            </div>
                            <span className="text-[11px] font-medium text-white/20">10分钟前</span>
                          </div>
                          <div>
                            <div className="text-lg font-bold tracking-tight">产品设计评审</div>
                            <div className="text-[13px] text-white/50 font-medium mt-0.5">Liquid Glass 折射引擎 v1.2</div>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-blue-400/80">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>15分钟后开始</span>
                          </div>
                        </div>
                      </GlassComponent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Controls Panel */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-[200]"
          >
            <div className="w-[310px] bg-[#0a0a0b]/85 backdrop-blur-3xl rounded-[28px] border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] max-h-[85vh] overflow-y-auto overflow-x-hidden custom-scrollbar relative">
              {/* Header Mask: Fixed positioning check, removed negative margins */}
              <div className="sticky top-0 z-20 px-7 pt-6 pb-10 mb-[-32px] bg-gradient-to-b from-[#0a0a0b] via-[#0a0a0b]/95 to-transparent pointer-events-none">
                <div className="flex items-center justify-between w-full pointer-events-auto">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 font-heading">参数控制中心</span>
                  <button onClick={() => setIsControlsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5 shadow-inner">
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </button>
                </div>
              </div>

              <div className="px-7 pt-4 pb-12 space-y-7 relative z-10">
                <ControlSlider label="厚度 (Thickness)" icon={<Layers className="w-3.5 h-3.5 opacity-50" />} value={params.glassThickness} min={1} max={150} onChange={(v: number) => handleParamChange('glassThickness', v)} />
                <ControlSlider label="倒角参数 (Bezel Width)" icon={<Maximize2 className="w-3.5 h-3.5 opacity-50" />} value={params.bezelWidth} min={1} max={30} onChange={(v: number) => handleParamChange('bezelWidth', v)} />
                <ControlSlider label="边缘曲率 (Radius)" icon={<Sun className="w-3.5 h-3.5 opacity-50" />} value={params.radius} min={0} max={80} onChange={(v: number) => handleParamChange('radius', v)} />
                <ControlSlider label="折射率 (Refraction)" icon={<Droplets className="w-3.5 h-3.5 opacity-50" />} value={params.refractiveIndex} min={1} max={3} step={0.1} onChange={(v: number) => handleParamChange('refractiveIndex', v)} />
                <ControlSlider label="折射比 (Scale)" icon={<Maximize2 className="w-3.5 h-3.5 opacity-50" />} value={params.scaleRatio} min={0.1} max={3} step={0.1} onChange={(v: number) => handleParamChange('scaleRatio', v)} />
                <ControlSlider label="引擎弥散 (Blur)" icon={<Sun className="w-3.5 h-3.5 opacity-50" />} value={params.blur} min={0} max={40} onChange={(v: number) => handleParamChange('blur', v)} />
                <ControlSlider label="高光硬度 (Hardness)" icon={<Sparkles className="w-3.5 h-3.5 opacity-50" />} value={params.specularHardness} min={0.5} max={10} step={0.1} onChange={(v: number) => handleParamChange('specularHardness', v)} />
                <ControlSlider label="高光层亮度 (Specular)" icon={<Sparkles className="w-3.5 h-3.5 opacity-50" />} value={params.specularOpacity} min={0} max={1} step={0.05} onChange={(v: number) => handleParamChange('specularOpacity', v)} />
                <ControlSlider label="光影饱和度 (Saturation)" icon={<Droplets className="w-3.5 h-3.5 opacity-50" />} value={params.refractionSaturation} min={0} max={5} step={0.1} onChange={(v: number) => handleParamChange('refractionSaturation', v)} />
                {activeUI === 'playground' && (
                  <>
                    <div className="h-px bg-white/10 my-2" />
                    <ControlSlider label="组件宽度" icon={<Maximize2 className="w-3.5 h-3.5" />} value={params.pgWidth} min={100} max={800} onChange={(v: number) => handleParamChange('pgWidth', v)} />
                    <ControlSlider label="组件高度" icon={<Maximize2 className="w-3.5 h-3.5" />} value={params.pgHeight} min={100} max={600} onChange={(v: number) => handleParamChange('pgHeight', v)} />
                    <ControlSlider label="圆球尺寸" icon={<Droplets className="w-3.5 h-3.5" />} value={params.pgCircleSize} min={50} max={400} onChange={(v: number) => handleParamChange('pgCircleSize', v)} />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer: Conditional rendering - Only on Landing Page */}
      {!isDemoStarted && (
        <footer className="relative w-full border-t border-white/5 bg-[#0a0a0b]/40 backdrop-blur-3xl px-6 md:px-12 py-12 md:py-16 mt-auto z-[60]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-8">

            {/* Brand & Mission Column */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-400/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <Droplets className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xl font-black tracking-[-0.03em] font-heading text-white/90">LiquidGlass</span>
              </div>
              <p className="text-[13px] text-white/30 leading-relaxed max-w-[280px] font-medium tracking-wide">
                基于物理折射原理打造的高性能 Web 渲染引擎，为现代空间化界面（Spatial UI）提供极致的光学交互方案。
              </p>
              <div className="flex items-center gap-5 pt-2">
                <button className="text-white/20 hover:text-white transition-all"><Github className="w-5 h-5" /></button>
                <button className="text-white/20 hover:text-white transition-all"><Twitter className="w-5 h-5" /></button>
                <button className="text-white/20 hover:text-white transition-all"><ExternalLink className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Nav Column 1: Engine */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 font-heading">光学引擎</h4>
              <ul className="space-y-3.5 text-[12px] font-semibold text-white/20">
                <li><a href="#" className="hover:text-white transition-colors">核心架构 (Core)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">折射算法 (Physics)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">高光层处理 (Specular)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">实时渲染流程</a></li>
              </ul>
            </div>

            {/* Nav Column 2: Developer */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 font-heading">开发者资源</h4>
              <ul className="space-y-3.5 text-[12px] font-semibold text-white/20">
                <li><a href="#" onClick={() => navigate('/docs')} className="hover:text-white transition-colors">官方技术文档</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nuxt 集成方案</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API 参考指南</a></li>
                <li><a href="#" className="hover:text-white transition-colors">常见问题解答</a></li>
              </ul>
            </div>

            {/* Nav Column 3: Status */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 font-heading">支持与合规</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/5 border border-green-500/10 w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-400/80">运行正常</span>
                </div>
                <ul className="space-y-3.5 text-[12px] font-semibold text-white/20">
                  <li><a href="#" className="hover:text-white transition-colors">隐私政策协议</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">开源协议</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="max-w-[1400px] mx-auto pt-12 md:pt-16 mt-12 md:mt-16 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-[10px] md:text-[11px] font-bold text-white/20 uppercase tracking-[0.2em] text-center sm:text-left">
              © 2026 LIQUIDGLASS ENGINE ™. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <span className="text-[9px] md:text-[10px] font-black text-white/10 tracking-[0.3em] uppercase">Hardware Accelerated</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/10 hidden sm:block" />
              <span className="text-[9px] md:text-[10px] font-black text-white/10 tracking-[0.3em] uppercase">Spatial UI v1.2</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}

/**
 * A reusable Glass Component that separates the filtered refraction layer from the sharp UI layer.
 */
export function GlassComponent({ id, width, height, maxWidth, params, sceneUrl, children }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Use integral values to prevent subpixel rendering artifacts in SVG
        const w = Math.round(rect.width);
        const h = Math.round(rect.height);

        if (w !== dimensions.w || h !== dimensions.h) {
          setDimensions({ w, h });
        }

        setOffset({
          x: -rect.left,
          y: -rect.top
        });
      }
    };

    update();
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });

    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [dimensions.w, dimensions.h]);

  return (
    <div
      ref={containerRef}
      className="relative group inline-block"
      style={{
        width: width || 'auto',
        height: height || 'auto',
        maxWidth: maxWidth || 'none'
      }}
    >
      {/* 1. Filter Definition */}
      {dimensions.w > 0 && dimensions.h > 0 && (
        <GlassFilter
          id={id}
          width={dimensions.w}
          height={dimensions.h}
          {...params}
        />
      )}

      {/* 2. Refraction Layer (Background) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          borderRadius: params.radius,
          filter: dimensions.w > 0 ? `url(#${id})` : 'none',
          willChange: 'filter'
        }}
      >
        {sceneUrl ? (
          <img
            src={sceneUrl}
            className="absolute w-[100vw] h-[100vh] object-cover opacity-100 max-w-none"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
              pointerEvents: 'none'
            }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0a0a0b]" />
        )}
      </div>

      {/* 3. Sharp UI Layer (This defines the size if width/height is auto) */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          borderRadius: params.radius,
          height: !height || height === 'auto' ? undefined : height,
          minHeight: !height || height === 'auto' ? undefined : height,
          width: !width || width === 'auto' ? undefined : width,
        }}
      >
        <div style={{ height: !height || height === 'auto' ? 'auto' : '100%' }}>
          {children}
        </div>
      </div>

      {/* 4. Subtle Outer Glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-black/40 translate-y-4 pointer-events-none"
        style={{ borderRadius: params.radius }}
      />
    </div>
  );
}

function ControlSlider({ label, value, min, max, step = 1, onChange, icon }: any) {
  return (
    <div className="space-y-4 group/slider">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2.5 text-[10px] font-extrabold text-white/30 uppercase tracking-[0.2em] font-heading group-hover/slider:text-white/60 transition-colors">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-[10px] font-mono text-white/60 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 group-hover/slider:bg-white/10 group-hover/slider:border-white/10 group-hover/slider:text-white transition-all tabular-nums">{value}</span>
      </div>
      <div className="px-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white hover:accent-blue-400 transition-all shadow-inner"
        />
      </div>
    </div>
  );
}
