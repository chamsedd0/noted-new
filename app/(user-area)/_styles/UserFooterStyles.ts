'use client'
import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #36303A;
  padding: 40px;
  margin-top: auto;
`

export const FooterContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding: 0 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;

  img {
    width: 120px;
    height: auto;
  }
`

export const FooterDescription = styled.p`
  color: white;
  font-size: 14px;
  line-height: 1.5;
  margin-left: 7px;
  font-weight: 300;
`

export const FooterLinks = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  
  a {
    color: white;
    margin-left: 7px;
    text-decoration: none;
    font-size: 14px;
    
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }

  

  span {
    color: white;
  }
`

export const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  text-align: right;

  p {
    color: white;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 300;
    
  }

  .email {
    
    font-weight: 500;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`

export const SocialLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 33px;
      height: 33px;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }
` 