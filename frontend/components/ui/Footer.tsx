"use client"

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  color: #333;
  text-decoration: none;
  margin-bottom: 5px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const  Footer = () => {
  return (
    <FooterContainer>
      <Column>
        <span>dAppify:</span>
        <Link href="#">dAppify pass</Link>
        <Link href="#">Gift cards</Link>
        <Link href="#">Return policy</Link>
      </Column>
      <Column>
        <span>About:</span>
        <Link href="#">Meet the team</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Contact us</Link>
      </Column>
      <Column>
        <span>Help & support:</span>
        <Link href="#">FAQs</Link>
        <Link href="#">Customer support</Link>
        <Link href="#">Report a bug</Link>
      </Column>
    </FooterContainer>
  );
};

export default Footer;
