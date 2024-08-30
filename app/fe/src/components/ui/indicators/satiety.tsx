import "./satiety.scss";
import "./indicator.scss";
import { IndicatorValue } from "~/components/ui/card/indicator-value.tsx";

type SatietyProps = {
  value: number;
  max: number;
};

export function Satiety({ value, max }: SatietyProps) {
  const percent = Math.round(100 - (value / max) * 100);

  console.log("Satiety percent", percent);

  return (
    <div className="satiety-indicator indicator">
      <IndicatorValue className="satiety-indicator__value-container" value={value} />
      <svg className="satiety-indicator__icon" fill="none" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <g className="satiety-indicator__stomac" id="satiety-indicator__stomac">
          <g className="satiety-indicator__external" id="satiety-indicator__external">
            <path
              d="M13.5596 79.9775C11.1481 79.7504 8.89324 78.028 8.03201 75.7339C7.68751 74.8257 7.50744 73.7609 7.57007 72.9858L7.61705 72.3673L7.08465 72.4221C6.39566 72.4926 5.40132 72.3516 4.53226 72.0619C2.76281 71.4747 1.30654 70.1359 0.547084 68.4134C-0.181051 66.7693 -0.181051 64.718 0.539255 63.0894C2.01119 59.7619 6.04333 58.1882 9.36301 59.6601C9.87192 59.8794 10.3339 59.9107 10.7018 59.7384C10.8349 59.6758 11.3282 59.2452 11.7901 58.7754L12.6279 57.9377L12.4713 57.4288C11.6022 54.5867 11.4065 50.5545 11.9311 46.4676C13.2073 36.4851 18.5234 24.3103 25.5151 15.3613C28.0597 12.0964 31.027 9.14476 33.8456 7.07779C39.0913 3.21789 44.705 0.947359 50.9529 0.148759C51.7984 0.0391471 52.6127 0.00782942 54.4761 0C57.1068 0 58.3203 0.117441 60.4108 0.555889C70.1897 2.62285 77.432 9.89638 79.4519 19.691C79.8982 21.8597 80 22.9558 80 25.5239C80 28.3033 79.8434 29.7753 79.2797 32.3355C77.6512 39.7813 73.5094 46.6868 67.3946 52.1752C61.5461 57.4209 53.2391 62.2595 45.1199 65.1564C39.4984 67.1607 35.5602 68.0141 30.5181 68.3195C27.8091 68.4839 24.9827 68.2099 22.7513 67.56L22.0701 67.3643L21.2167 68.2099C20.747 68.6718 20.3164 69.1651 20.2537 69.306C20.0893 69.6818 20.1206 70.1202 20.3398 70.6057C20.7861 71.6313 20.9897 72.9545 20.8488 74.0428C20.3868 77.7539 17.2394 80.3141 13.5596 79.9775ZM15.2116 77.1902C16.2686 76.9553 17.2707 76.1411 17.7875 75.1076C18.3747 73.9567 18.3825 72.884 17.8266 71.5452C17.5839 70.958 17.5369 70.7388 17.5056 70.0654C17.4351 68.7579 17.7405 67.9828 18.7426 66.9493C19.0793 66.5892 19.3612 66.276 19.3612 66.2525C19.3612 66.229 19.1028 66.0724 18.7975 65.9002C17.5917 65.2347 16.1355 63.9976 15.2194 62.8545C14.7653 62.2908 13.8649 60.9363 13.7788 60.6936C13.7631 60.6388 13.4578 60.8815 13.0741 61.2417C12.0955 62.1812 11.3282 62.5179 10.1694 62.5179C9.47262 62.5179 9.01068 62.4161 8.26689 62.0951C7.13945 61.6175 5.98853 61.6567 4.89241 62.2125C2.89591 63.2069 2.13646 65.5479 3.13079 67.5992C3.40482 68.1707 4.2504 69.0163 4.8376 69.306C6.30953 70.042 8.08681 69.8306 9.3082 68.7736C9.9737 68.202 10.4513 68.1003 11.062 68.4134C11.3204 68.5387 11.4613 68.6796 11.5944 68.938C11.8997 69.5487 11.798 70.0263 11.2264 70.6918C10.1538 71.9367 9.95804 73.7139 10.7253 75.2407C10.8349 75.4521 11.1638 75.8592 11.4456 76.1411C12.4791 77.1589 13.771 77.519 15.2116 77.1902ZM33.1018 65.4226C38.9191 64.6631 44.8929 62.7449 51.3443 59.5819C57.7723 56.4266 63.7931 52.2379 67.6765 48.2057C71.6852 44.0483 74.6682 38.9905 76.1636 33.8231C77.0483 30.7383 77.338 28.687 77.338 25.4456C77.3302 23.1594 77.2675 22.353 76.9465 20.6853C75.7721 14.5784 72.4759 9.55972 67.5121 6.34183C63.6913 3.86773 59.5261 2.62285 55.0242 2.62285C48.7606 2.62285 42.5206 4.50191 37.1026 8.00949C32.7416 10.8359 28.6782 15.1108 24.8809 20.8654C19.964 28.3112 16.3312 36.9705 14.9454 44.5102C14.5539 46.6242 14.4208 47.9787 14.3738 50.1161C14.319 52.4806 14.4052 53.6237 14.7418 55.3305C15.9867 61.547 19.784 64.8041 26.6817 65.5714C27.77 65.6888 31.7708 65.6027 33.1018 65.4226Z"
              fill="black"
            />
            <path
              d="M15.2116 77.1902C16.2686 76.9553 17.2707 76.1411 17.7875 75.1076C18.3747 73.9567 18.3825 72.884 17.8266 71.5452C17.5839 70.958 17.5369 70.7388 17.5056 70.0654C17.4351 68.7579 17.7405 67.9828 18.7426 66.9493C19.0793 66.5892 19.3612 66.276 19.3612 66.2525C19.3612 66.229 19.1028 66.0724 18.7975 65.9002C17.5917 65.2347 16.1355 63.9976 15.2194 62.8545C14.7653 62.2908 13.8649 60.9363 13.7788 60.6936C13.7631 60.6388 13.4578 60.8815 13.0741 61.2417C12.0955 62.1812 11.3282 62.5179 10.1694 62.5179C9.47262 62.5179 9.01068 62.4161 8.26689 62.0951C7.13945 61.6175 5.98853 61.6567 4.89241 62.2125C2.89591 63.2069 2.13646 65.5479 3.13079 67.5992C3.40482 68.1707 4.2504 69.0163 4.8376 69.306C6.30953 70.042 8.08681 69.8306 9.3082 68.7736C9.9737 68.202 10.4513 68.1003 11.062 68.4134C11.3204 68.5387 11.4613 68.6796 11.5944 68.938C11.8997 69.5487 11.798 70.0263 11.2264 70.6918C10.1538 71.9367 9.95804 73.7139 10.7253 75.2407C10.8349 75.4521 11.1638 75.8592 11.4456 76.1411C12.4791 77.1589 13.771 77.519 15.2116 77.1902Z"
              fill="white"
            />
            <path
              d="M33.1018 65.4226C38.9191 64.6631 44.8929 62.7449 51.3443 59.5819C57.7723 56.4266 63.7931 52.2379 67.6765 48.2057C71.6852 44.0483 74.6682 38.9905 76.1636 33.8231C77.0483 30.7383 77.338 28.687 77.338 25.4456C77.3302 23.1594 77.2675 22.353 76.9465 20.6853C75.7721 14.5784 72.4759 9.55972 67.5121 6.34183C63.6913 3.86773 59.5261 2.62285 55.0242 2.62285C48.7606 2.62285 42.5206 4.50191 37.1026 8.00949C32.7416 10.8359 28.6782 15.1108 24.8809 20.8654C19.964 28.3112 16.3312 36.9705 14.9454 44.5102C14.5539 46.6242 14.4208 47.9787 14.3738 50.1161C14.319 52.4806 14.4052 53.6237 14.7418 55.3305C15.9867 61.547 19.784 64.8041 26.6817 65.5714C27.77 65.6888 31.7708 65.6027 33.1018 65.4226Z"
              fill="#FFDF00"
            />
          </g>
          <g className="satiety-indicator__inner" id="satiety-indicator__inner">
            <g className="satiety-indicator__inner-border" id="satiety-indicator__inner-border">
              <path
                d="M26.7673 62.9096C21.0362 62.2597 18.0845 59.5507 17.2076 54.1406C16.5969 50.3747 17.2076 45.0976 18.8518 39.7736C19.0554 39.1316 19.2511 38.4818 19.2902 38.3408C19.3372 38.1999 19.5564 37.5657 19.7913 36.9316C23.7687 25.986 30.3376 16.2462 37.1335 11.2276C41.0873 8.31503 45.9572 6.30287 50.7958 5.59823C53.2308 5.2459 56.2294 5.1911 57.9989 5.48079C63.2289 6.31853 67.7856 8.99619 70.7765 12.9892C76.9774 21.2649 75.7638 34.113 67.8561 43.9624C65.335 47.1176 62.0545 49.9988 57.8423 52.7705C49.8641 58.0318 40.8838 61.6177 32.8195 62.7608C31.5433 62.9409 27.8635 63.027 26.7673 62.9096ZM31.2223 60.2476C39.6937 59.4803 50.7019 54.9236 58.8679 48.8088C63.777 45.1368 67.1593 41.2064 69.3985 36.5636C70.6747 33.9094 71.442 31.4666 71.8648 28.6559C72.0292 27.5676 72.0997 24.4828 71.9822 23.4493C71.5673 19.9026 70.5338 17.1388 68.6704 14.6177C66.1963 11.2746 62.1798 8.89441 57.7248 8.14279C55.9711 7.84527 52.9959 7.92356 50.5688 8.33852C45.0882 9.27022 39.9442 11.8774 35.8729 15.7921C28.2628 23.1048 21.4355 36.4618 19.9557 46.9375C19.7209 48.5974 19.6504 49.7561 19.6974 51.4629C19.7444 53.5691 19.9557 54.7905 20.5116 56.1684C21.1536 57.7735 22.2811 58.8852 23.9409 59.5429C24.5829 59.8013 26.0235 60.1301 26.9161 60.2319C27.793 60.3337 30.1966 60.3415 31.2223 60.2476Z"
                fill="black"
              />
            </g>
            <mask className="satiety-indicator__mask" height="54" id="satiety-indicator__mask" maskUnits="userSpaceOnUse" width="54" x="19" y="7">
              <g id="satiety-indicator__mask-inner">
                <path
                  d="M26.6811 60.4663C26.3366 60.4272 25.6476 60.3097 25.1544 60.2001C23.5259 59.8321 22.4846 59.3154 21.5842 58.415C20.5898 57.4207 20.0183 56.1523 19.6268 54.054C19.4546 53.1693 19.3919 49.8496 19.5094 48.5186C20.0105 43.0459 21.8504 37.1033 25.0135 30.6989C28.4741 23.7072 32.6393 18.0309 37.0942 14.2571C39.7641 11.9944 42.8724 10.2563 46.2938 9.121C49.3316 8.111 52.3381 7.65689 55.5325 7.73519C58.1162 7.79782 59.2123 8.02488 60.465 8.74518C65.7421 11.7908 68.8895 16.8799 69.4689 23.2922C69.8212 27.1991 69.1792 31.3957 67.629 35.3104C65.6638 40.2742 62.3285 44.737 57.7717 48.503C53.5125 52.0184 48.5487 54.9701 42.0894 57.8278C41.9485 57.8826 41.831 57.9766 41.831 58.0314C41.831 58.0783 41.33 58.2897 40.7193 58.4855C37.5562 59.5189 34.2991 60.2236 31.4571 60.482C30.4236 60.5759 27.558 60.5681 26.6811 60.4663Z"
                  fill="#FF9700"
                />
                <path
                  d="M41.3613 58.0548C41.3613 58.0079 41.4161 57.9531 41.4787 57.9296C41.5413 57.8983 41.5961 57.8434 41.5961 57.7886C41.5961 57.7417 41.7136 57.6477 41.8545 57.5929C47.57 55.064 52.0249 52.5116 55.971 49.5051C61.4672 45.3242 65.2097 40.6031 67.3941 35.0755C70.565 27.0582 69.7586 18.8451 65.2488 13.2314C64.278 12.0179 62.9391 10.773 61.5612 9.80998C60.9348 9.37154 59.4316 8.49464 59.3063 8.49464C59.2515 8.49464 59.2123 8.43983 59.2123 8.3772C59.2123 7.83697 62.8217 9.24626 64.8495 10.5851C69.1087 13.3959 71.5671 17.6081 72.2092 23.2061C72.3344 24.2709 72.264 27.8176 72.0995 28.8903C71.3401 33.8776 69.281 38.4422 65.9065 42.6466C61.5612 48.0645 53.4969 53.5373 44.6888 57.0527C42.2773 58.0157 41.3613 58.2897 41.3613 58.0548Z"
                  fill="#F67C00"
                />
              </g>
            </mask>
            <g mask="url(#satiety-indicator__mask)">
              <g id="satiety-indicator__mask-bg">
                <path
                  d="M26.6811 60.4663C26.3366 60.4272 25.6476 60.3097 25.1544 60.2001C23.5259 59.8321 22.4846 59.3154 21.5842 58.415C20.5898 57.4207 20.0183 56.1523 19.6268 54.054C19.4546 53.1693 19.3919 49.8496 19.5094 48.5186C20.0105 43.0459 21.8504 37.1033 25.0135 30.6989C28.4741 23.7072 32.6393 18.0309 37.0942 14.2571C39.7641 11.9944 42.8724 10.2563 46.2938 9.121C49.3316 8.111 52.3381 7.65689 55.5325 7.73519C58.1162 7.79782 59.2123 8.02488 60.465 8.74518C65.7421 11.7908 68.8895 16.8799 69.4689 23.2922C69.8212 27.1991 69.1792 31.3957 67.629 35.3104C65.6638 40.2742 62.3285 44.737 57.7717 48.503C53.5125 52.0184 48.5487 54.9701 42.0894 57.8278C41.9485 57.8826 41.831 57.9766 41.831 58.0314C41.831 58.0783 41.33 58.2897 40.7193 58.4855C37.5562 59.5189 34.2991 60.2236 31.4571 60.482C30.4236 60.5759 27.558 60.5681 26.6811 60.4663Z"
                  fill="white"
                />
                <path
                  d="M41.3613 58.0548C41.3613 58.0079 41.4161 57.9531 41.4787 57.9296C41.5413 57.8983 41.5961 57.8434 41.5961 57.7886C41.5961 57.7417 41.7136 57.6477 41.8545 57.5929C47.57 55.064 52.0249 52.5116 55.971 49.5051C61.4672 45.3242 65.2097 40.6031 67.3941 35.0755C70.565 27.0582 69.7586 18.8451 65.2488 13.2314C64.278 12.0179 62.9391 10.773 61.5612 9.80998C60.9348 9.37154 59.4316 8.49464 59.3063 8.49464C59.2515 8.49464 59.2123 8.43983 59.2123 8.3772C59.2123 7.83697 62.8217 9.24626 64.8495 10.5851C69.1087 13.3959 71.5671 17.6081 72.2092 23.2061C72.3344 24.2709 72.264 27.8176 72.0995 28.8903C71.3401 33.8776 69.281 38.4422 65.9065 42.6466C61.5612 48.0645 53.4969 53.5373 44.6888 57.0527C42.2773 58.0157 41.3613 58.2897 41.3613 58.0548Z"
                  fill="white"
                />
              </g>
              <svg height="53" preserveAspectRatio="none" viewBox="0 0 80 53" width="80" x="19" y="8">
                <g
                  className="satiety-indicator__satiety-level"
                  id="satiety-indicator__satiety-level"
                  style={{ transform: `translateX(-22px) translateY(calc(${percent}% - 8px))` }}
                >
                  <path d="M18.3984 62H75.9446V10H18.3984V62Z" fill="#FF9700" id="level" />
                  <path
                    className="satiety-indicator__dark-wave"
                    d="M69.6252 8.35335C60.3275 8.35336 48.6277 2.15998 34.652 3.09641C26.7558 3.62549 23.1604 6.46851 15.2329 6.8237C6.80371 7.20137 2.36286 4.5486 -6.08684 4.5486C-16.4525 4.5486 -21.9125 5.48737 -32 6.82016C-33.52 7.02099 -35.2894 7.51088 -35.2894 7.51088C-35.2894 7.51088 -40.2706 8.35334 -42.3748 8.35335C-51.6725 8.35336 -63.3723 2.15998 -77.348 3.09641C-85.2442 3.62549 -88.8396 6.46851 -96.7671 6.8237C-105.196 7.20137 -109.637 4.5486 -118.087 4.5486C-128.453 4.5486 -133.912 5.48737 -144 6.82016V11L-32.012 10.9966L-32 11L80 10.9966V6.8237C80 6.8237 73.5664 8.35334 69.6252 8.35335Z"
                    fill="#C17300"
                    id="dark-wave"
                  />
                  <path
                    className="satiety-indicator__wave"
                    d="M29.3748 9.01501C38.6725 9.01502 50.3723 4.36999 64.348 5.07231C72.2442 5.46912 75.8396 7.60138 83.7671 7.86777C92.1963 8.15103 96.6371 6.16145 105.087 6.16145C115.453 6.16145 120.912 6.86552 131 7.86512C132.52 8.01574 134.289 8.38316 134.289 8.38316C134.289 8.38316 139.271 9.01501 141.375 9.01501C150.672 9.01502 162.372 4.36999 176.348 5.07231C184.244 5.46912 187.84 7.60138 195.767 7.86777C204.196 8.15103 208.637 6.16145 217.087 6.16145C227.453 6.16145 232.912 6.86552 243 7.86512V11L131.012 10.9974L131 11L19 10.9974V7.86777C19 7.86777 25.4336 9.015 29.3748 9.01501Z"
                    fill="#FF9700"
                    id="wave"
                  />
                </g>
              </svg>
              <g className="satiety-indicator__glare" id="satiety-indicator__glare">
                <path
                  d="M41.3613 58.0548C41.3613 58.0078 41.4161 57.953 41.4788 57.9295C41.5414 57.8982 41.5962 57.8434 41.5962 57.7886C41.5962 57.7416 41.7137 57.6476 41.8546 57.5928C47.5701 55.0639 52.025 52.5115 55.971 49.505C61.4673 45.3241 65.2097 40.603 67.3941 35.0754C70.565 27.0581 69.7586 18.845 65.2489 13.2314C64.278 12.0178 62.9392 10.7729 61.5612 9.8099C60.9349 9.37145 59.4316 8.49456 59.3063 8.49456C59.2515 8.49456 59.2124 8.43975 59.2124 8.37712C59.2124 7.83689 62.8218 9.24618 64.8496 10.585C69.1088 13.3958 71.5672 17.608 72.2092 23.206C72.3345 24.2708 72.264 27.8176 72.0996 28.8902C71.3402 33.8775 69.281 38.4421 65.9065 42.6465C61.5612 48.0644 53.4969 53.5372 44.6888 57.0526C42.2774 58.0156 41.3613 58.2896 41.3613 58.0548Z"
                  fill="#000000"
                />
              </g>
            </g>
          </g>
          <g className="satiety-indicator__face" id="satiety-indicator__face">
            <circle cx="26.5724" cy="50.6877" fill="black" id="l-eye" r="1.44061" />
            <circle cx="38.5519" cy="54.446" fill="black" id="r-eye" r="1.44061" />
            <path
              className="satiety-indicator__happy-mouth"
              clipRule="evenodd"
              d="M32.6211 55.8342C32.9173 56.3646 32.7275 57.0347 32.1971 57.3309L31.6607 56.3706C32.1971 57.3309 32.1973 57.3308 32.1971 57.3309L32.1933 57.333L32.1873 57.3364L32.1688 57.3465C32.1536 57.3547 32.1328 57.3659 32.1068 57.3796C32.055 57.4069 31.9821 57.4444 31.892 57.4886C31.7125 57.5764 31.46 57.6928 31.1643 57.8084C30.6044 58.0271 29.7636 58.2943 28.9413 58.2677C28.2433 58.2452 27.4682 57.9838 26.9538 57.7838C26.6779 57.6766 26.4377 57.571 26.2661 57.4922C26.18 57.4527 26.1102 57.4194 26.0609 57.3955C26.0362 57.3835 26.0166 57.3738 26.0025 57.3668L25.9855 57.3584L25.9803 57.3558L25.9775 57.3544C25.9774 57.3543 25.9773 57.3542 26.4742 56.3729L25.9775 57.3544C25.4355 57.0799 25.2184 56.4179 25.4929 55.8759C25.7672 55.3342 26.4285 55.1173 26.9703 55.3911C26.9705 55.3912 26.9702 55.3911 26.9703 55.3911L26.9716 55.3918L26.9803 55.3961L27.021 55.416C27.058 55.434 27.1138 55.4606 27.1845 55.4931C27.3267 55.5584 27.5255 55.6457 27.7509 55.7333C28.2389 55.923 28.7151 56.0593 29.0122 56.0689C29.3771 56.0807 29.8782 55.9489 30.3635 55.7593C30.5904 55.6706 30.7863 55.5804 30.9246 55.5126C30.9933 55.479 31.0467 55.4515 31.0813 55.4332C31.0986 55.4241 31.1111 55.4174 31.1185 55.4134L31.1243 55.4102C31.6547 55.1142 32.3249 55.3039 32.6211 55.8342ZM26.9716 55.3918C26.9716 55.3917 26.9716 55.3918 26.9716 55.3918Z"
              fill="black"
              fillRule="evenodd"
              id="satiety-indicator__happy-mouth"
            />
            <path
              className="hidden satiety-indicator__neutral-mouth"
              d="M33.7116 56.4657C29.434 55.9709 30.8774 55.7566 26.8674 55.674"
              id="satiety-indicator__neutral-mouth"
            />
            <path
              className="hidden satiety-indicator__unhappy-mouth"
              d="M26.541 57.1704C26.541 57.1704 28.0628 56.4501 29.0621 56.4501C30.0614 56.4501 31.5832 57.1704 31.5832 57.1704"
              id="satiety-indicator__unhappy-mouth"
            />
            <path
              className="hidden satiety-indicator__scared-mouth"
              d="M30.3386 56.8418C30.3386 56.8418 30.2603 56.8027 29.0859 56.5287"
              id="satiety-indicator__scared-mouth"
            />
          </g>
          <path
            clipRule="evenodd"
            d="M48 13C48.6933 13 49.2554 13.5621 49.2554 14.2554V15.4242C49.2554 16.1176 48.6933 16.6797 48 16.6797C47.3067 16.6797 46.7446 16.1176 46.7446 15.4242V14.2554C46.7446 13.5621 47.3067 13 48 13ZM43 18C43 17.3067 43.5621 16.7446 44.2554 16.7446H45.4242C46.1176 16.7446 46.6797 17.3067 46.6797 18C46.6797 18.6933 46.1176 19.2554 45.4242 19.2554H44.2554C43.5621 19.2554 43 18.6933 43 18ZM49.3203 18C49.3203 17.3067 49.8824 16.7446 50.5758 16.7446H51.7446C52.4379 16.7446 53 17.3067 53 18C53 18.6933 52.4379 19.2554 51.7446 19.2554H50.5758C49.8824 19.2554 49.3203 18.6933 49.3203 18ZM48 19.3203C48.6933 19.3203 49.2554 19.8824 49.2554 20.5758V21.7446C49.2554 22.4379 48.6933 23 48 23C47.3067 23 46.7446 22.4379 46.7446 21.7446V20.5758C46.7446 19.8824 47.3067 19.3203 48 19.3203Z"
            fill="white"
            fillRule="evenodd"
            id="satiety-indicator__glare_2"
          />
        </g>
      </svg>
    </div>
  );
}
