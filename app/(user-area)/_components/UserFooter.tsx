'use client'
import { 
  FooterWrapper,
  FooterContainer, 
  FooterLeft, 
  FooterRight, 
  FooterLinks,
  SocialLinks,
  FooterDescription
} from '../_styles/UserFooterStyles'
import Link from 'next/link'

export default function UserFooter() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterLeft>
          <img src="/logo.svg" alt="Noted" />
          <FooterDescription>
            Noted is a auxiliary tool for students that assist users in their studies, schedules, deadlines and
            everything else related to the school problems.
          </FooterDescription>
          <FooterLinks>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms">Terms & Conditions</Link>
          </FooterLinks>
        </FooterLeft>

        <FooterRight>
          <div>
            <p>Facing some problems?</p>
            <p>Contact us via email or Social Media</p>
          </div>
          <SocialLinks>
            <a href="#telegram">
              <img src="/telegram.svg" alt="Telegram" />
            </a>
            <a href="#twitter">
              <img src="/X.svg" alt="Twitter" />
            </a>
            <a href="#instagram">
              <img src="/instagram.svg" alt="Instagram" />
            </a>
            <a href="#facebook">
              <img src="/facebook.svg" alt="Facebook" />
            </a>
          </SocialLinks>
          <p className='email'>support@noted.ai</p>
        </FooterRight>
      </FooterContainer>
    </FooterWrapper>
  )
} 