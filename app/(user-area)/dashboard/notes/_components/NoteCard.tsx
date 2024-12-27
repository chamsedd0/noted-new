'use client'
import { CourseNoteCard, CardHeader, Title, NotesInfo, LastChecked, CardFooter } from './_styles/noteCard'

interface NoteCardProps {
  title: string
  description: string
  lastChecked: string
  color: string
  clickFunction: (title: string) => void
  type?: 'smart' | 'regular' | 'practice'
}


const SmartIcon = ({color }: {color: string}) => {
  return(
      <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_301_2266)">
          <path d="M28.1357 10.393C29.9381 5.11815 37.2261 4.9584 39.3631 9.91378L39.544 10.3961L41.9763 17.5096C42.5337 19.141 43.4345 20.6339 44.6179 21.8875C45.8013 23.1412 47.2398 24.1265 48.8363 24.7769L49.4904 25.0211L56.6035 27.4505C61.8782 29.253 62.0379 36.5414 57.0858 38.6785L56.6035 38.8594L49.4904 41.2918C47.8585 41.8489 46.3651 42.7496 45.111 43.9331C43.8569 45.1166 42.8712 46.5553 42.2204 48.1522L41.9763 48.8033L39.547 55.9199C37.7446 61.1948 30.4566 61.3545 28.3226 56.4021L28.1357 55.9199L25.7064 48.8063C25.1493 47.1743 24.2487 45.6809 23.0653 44.4267C21.8819 43.1725 20.4432 42.1867 18.8464 41.536L18.1954 41.2918L11.0822 38.8624C5.80456 37.0599 5.64481 29.7715 10.5999 27.6374L11.0822 27.4505L18.1954 25.0211C19.8267 24.4636 21.3195 23.5628 22.5731 22.3793C23.8266 21.1959 24.8119 19.7573 25.4623 18.1607L25.7064 17.5096L28.1357 10.393ZM57.9538 5.44632e-07C58.5177 -7.11272e-07 59.0703 0.158181 59.5487 0.456569C60.0272 0.754957 60.4124 1.18158 60.6605 1.68797L60.8052 2.04063L61.8601 5.13322L64.9555 6.1882C65.5206 6.38019 66.016 6.73563 66.3788 7.20946C66.7417 7.6833 66.9558 8.2542 66.9939 8.84982C67.0319 9.44544 66.8924 10.039 66.5928 10.5552C66.2933 11.0714 65.8472 11.487 65.3112 11.7494L64.9555 11.8941L61.8631 12.9491L60.8082 16.0447C60.6158 16.6097 60.2602 17.1048 59.7862 17.4674C59.3122 17.83 58.7412 18.0437 58.1457 18.0815C57.5501 18.1193 56.9567 17.9794 56.4407 17.6796C55.9247 17.3797 55.5094 16.9335 55.2472 16.3974L55.1026 16.0447L54.0476 12.9521L50.9522 11.8971C50.3871 11.7051 49.8917 11.3497 49.5289 10.8759C49.166 10.402 48.9519 9.83113 48.9138 9.23552C48.8758 8.6399 49.0153 8.04638 49.3149 7.53017C49.6145 7.01397 50.0605 6.59832 50.5965 6.3359L50.9522 6.19121L54.0446 5.13624L55.0995 2.04063C55.3028 1.4451 55.6873 0.928105 56.1992 0.562149C56.711 0.196193 57.3246 -0.000377626 57.9538 5.44632e-07Z" fill={color}/>
          </g>
          <defs>
          <filter id="filter0_d_301_2266" x="0" y="0" width="67" height="67" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-5" dy="5"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_301_2266"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_301_2266" result="shape"/>
          </filter>
          </defs>
      </svg>
  )
}

interface RegularIconProps {
  color: string;
}

const RegularIcon = ({ color }: RegularIconProps) => {
  return (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1067_516)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M64.675 25.8709C66.5377 19.1791 67.4688 15.8338 66.7655 12.9367C66.2118 10.6482 64.9651 8.56919 63.1831 6.9627C60.9288 4.9329 57.4509 4.03608 50.5036 2.24466L50.4921 2.24171C43.5311 0.445358 40.0505 -0.451335 37.039 0.225638C34.6634 0.758726 32.5052 1.95726 30.837 3.66989C29.0257 5.53156 28.0816 8.2543 26.6776 13.2009L25.9247 15.8881L24.3295 21.6245C22.4627 28.32 21.5309 31.6663 22.2344 34.5642C22.7887 36.8516 24.0353 38.9295 25.8167 40.5352C28.0694 42.5665 31.5438 43.4635 38.4837 45.2551L38.5108 45.2621C44.7807 46.8774 48.2273 47.7652 51.0506 47.4296C51.3592 47.394 51.6626 47.3425 51.9609 47.2752C54.3368 46.7413 56.4951 45.5417 58.1629 43.828C60.2738 41.6604 61.2059 38.317 63.0679 31.6388L64.675 25.8709ZM34.8993 22.3951C34.7142 22.6271 34.5783 22.8919 34.4996 23.1744C34.3412 23.7445 34.4245 24.3548 34.7311 24.8659C35.0377 25.377 35.5427 25.75 36.1349 25.9031L51.0383 29.7452C51.3348 29.831 51.6463 29.8587 51.9541 29.8265C52.262 29.7944 52.56 29.7032 52.8306 29.5582C53.1011 29.4132 53.3387 29.2174 53.5292 28.9825C53.7197 28.7475 53.8592 28.4782 53.9396 28.1904C54.0199 27.9026 54.0394 27.6022 53.9969 27.3071C53.9544 27.0119 53.8508 26.7279 53.6922 26.472C53.5336 26.2161 53.3232 25.9934 53.0735 25.8171C52.8238 25.6408 52.5399 25.5146 52.2386 25.4458L37.3352 21.6008C37.0416 21.5249 36.7354 21.5054 36.434 21.5434C36.1326 21.5814 35.8419 21.6762 35.5786 21.8223C35.3153 21.9684 35.0844 22.1631 34.8993 22.3951ZM33.183 30.4312C32.6519 30.7263 32.2642 31.2121 32.1052 31.7821C32.0263 32.0646 32.006 32.3592 32.0455 32.6493C32.085 32.9393 32.1835 33.219 32.3354 33.4724C32.4872 33.7258 32.6895 33.9479 32.9306 34.1261C33.1717 34.3043 33.4469 34.435 33.7405 34.5107L42.6825 36.8148C42.9797 36.9023 43.292 36.9312 43.6011 36.9C43.9101 36.8688 44.2094 36.778 44.4812 36.633C44.7529 36.4881 44.9916 36.292 45.1829 36.0564C45.3742 35.8207 45.5142 35.5505 45.5946 35.2617C45.6751 34.9729 45.6942 34.6714 45.651 34.3754C45.6077 34.0793 45.503 33.7946 45.3429 33.5383C45.1829 33.282 44.9708 33.0594 44.7195 32.8836C44.4681 32.7079 44.1825 32.5827 43.8797 32.5155L34.9377 30.2084C34.3452 30.056 33.7141 30.1362 33.183 30.4312Z" fill={color}/>
  <path d="M10.7624 44.0626L9.2332 38.3073C7.44367 31.5898 6.55038 28.2295 7.22478 25.325C7.75558 23.029 8.9507 20.9432 10.6589 19.3314C12.6525 17.4517 15.643 16.5401 21.3222 15L21.2689 15.2085L19.6864 21.1485C18.8346 24.3509 18.1247 27.026 17.7283 29.2572C17.3142 31.5838 17.1604 33.8299 17.6928 36.1207C18.4232 39.276 20.066 42.1424 22.4136 44.3575C24.1203 45.9662 26.1258 46.9582 28.3354 47.7625C30.4053 48.5141 32.9897 49.2137 36.0771 50.0495L36.2123 50.086L36.2862 50.1039L36.6027 50.1903L36.6822 50.2118C39.5404 50.9829 41.9606 51.6359 44.0004 52.0432C44.9909 52.2494 45.9923 52.3986 46.9997 52.4901C46.8321 52.6688 46.6586 52.8436 46.4791 53.0144C44.3181 55.0538 40.9841 55.9536 34.3243 57.7509L34.3133 57.7539C27.6402 59.5531 24.3037 60.4528 21.4168 59.7736C19.1395 59.2387 17.0706 58.0363 15.4714 56.318C13.4453 54.1404 12.549 50.7801 10.7624 44.0626Z" fill={color}/>
    </g>
    <defs>
    <filter id="filter0_d_1067_516" x="0" y="0" width="67" height="67" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="-5" dy="5"/>
    <feGaussianBlur stdDeviation="1"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1067_516"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1067_516" result="shape"/>
    </filter>
    </defs>
    </svg>
    
      
  )
}

interface PracticeIconProps {
  color: string;
}

const PracticeIcon = ({ color }: PracticeIconProps) => {
  return (
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1067_3036)">
        <path d="M49.8396 1.9248L46.8415 4.92834C44.8918 6.88147 44.8933 10.0448 46.8447 11.9962L54.4486 19.6002C56.4012 21.5528 59.5671 21.5528 61.5197 19.6002L64.5115 16.6084C67.0779 14.042 67.0779 9.89355 64.5115 7.32715L59.1209 1.9248C56.5545 -0.641602 52.406 -0.641602 49.8396 1.9248ZM41.2143 11.6634C40.724 11.1727 40.0032 10.9924 39.3396 11.1943L22.4529 16.2568C20.1209 16.96 18.2693 18.7412 17.4959 21.0615L7.11307 52.0225C6.39496 54.1579 9.27026 54.5185 10.8638 52.9259L24.1944 39.6041C25.2578 38.5413 25.4178 36.9087 25.4178 35.4053C25.4178 32.2998 27.9373 29.7803 31.0428 29.7803C34.1482 29.7803 36.6678 32.2998 36.6678 35.4053C36.6678 38.5107 34.1482 41.0303 31.0428 41.0303C29.5392 41.0303 27.9066 41.1899 26.8434 42.2531L13.5128 55.5837C11.9219 57.1746 12.287 60.069 14.4138 59.335L45.3865 48.9521C47.6951 48.1787 49.4881 46.3271 50.1912 43.9951L55.2537 27.1084C55.4488 26.4437 55.2656 25.7255 54.7759 25.2355L41.2143 11.6634Z" fill={color}/>
      </g>
      <defs>
        <filter id="filter0_d_1067_3036" x="0" y="0" width="66.4365" height="66.452" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-5" dy="5"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1067_3036"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1067_3036" result="shape"/>
        </filter>
      </defs>
    </svg>
  )
}



const CourseNoteCardComponent = ({ title, type, description, lastChecked, color, clickFunction }: NoteCardProps) => {
  return (
    <CourseNoteCard onClick={() => clickFunction(title)}>
      <CardHeader>
        <div>
          <Title>{title}</Title>
          <NotesInfo>{description}</NotesInfo>
        </div>
        {type === 'smart' ? (
          <div id="smartIcon"><SmartIcon color={color} /></div>
        ) : type === 'practice' ? (
          <div id="practiceIcon"><PracticeIcon color={color} /></div>
        ) : (
          <div id="regularIcon"><RegularIcon color={color} /></div>
        )}
      </CardHeader>

      <CardFooter onClick={(e) => e.stopPropagation()}>
        <LastChecked>Last Checked: {lastChecked}</LastChecked>
        <div className="dots">
          <img src="/menuDots.svg" alt="menu" />
        </div>
      </CardFooter>
    </CourseNoteCard>
  )
}

export default CourseNoteCardComponent;