import React, { useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import TopNavigation from '../../components/molecules/TopNavigation/TopNavigation';
import MainPageHeader from '../../components/molecules/MainPageHeader/MainPageHeader';
import MainPageInfoSection from '../../components/organisms/MainPageInfoSection/MainPageInfoSection';
import MainPageAccountsSection from '../../components/organisms/MainPageAccountsSection/MainPageAccountsSection';
import DevicesSection from '../../components/organisms/DevicesSection/DevicesSection';
import MainPageBottomSection from '../../components/organisms/MainPageBottomSection/MainPageBottomSection';
import CookieInfoModal from '../../components/molecules/CookieInfoModal/CookieInfoModal';
import Footer from '../../components/atoms/Footer/Footer';
import Images from '../../themes/Images';
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding-bottom: 15px;
`;
const info1 = 'Kontroluj obecny stan domowego budżetu ';
const info2 =
  'Dodawaj przewidywane kwoty wydatków i przychodów aby oszacować stan domowego budżetu w przyszłości';
const info3 = 'Przewiduj kwoty przyszłych wypłat na podstawie wprowadzonych godzin pracy';
const info4 = 'Kalendarz uwzględniający dni wolne od pracy z powodu świąt';
const info5 = 'Do swojej dyspozycji otrzymujesz cztery rodzaje kont:';
const {
  homeImage,
  statsImage,
  clockImage,
  calendarImage,
  accountsImage,
  mainAccountImage,
  debitCardImage,
  walletImage,
  pigImage,
  mainAccountExample,
  predictingExample,
  paymentsExample,
  calendarExample,
} = Images;

const tilesArr = [
  {
    tileLabel: 'Konto główne',
    tileImage: mainAccountImage,
  },
  {
    tileLabel: 'Karta debetowa',
    tileImage: debitCardImage,
  },
  {
    tileLabel: 'Portfel',
    tileImage: walletImage,
  },
  {
    tileLabel: 'Konto oszczędnościowe',
    tileImage: pigImage,
  },
];

const MainPageView = () => {
  const [cookies, setCookie] = useCookies(['infoSaw']);
  const [cookiesInfoRed, setCookiesIfoRed] = useState(cookies.infoSaw);

  const hideCookieInfo = () => {
    setCookie('infoSaw', true);
    setCookiesIfoRed(true);
  };

  return (
    <StyledWrapper>
      <TopNavigation />
      <MainPageHeader />
      <MainPageInfoSection
        labelText={info1}
        imageObj={homeImage}
        exampleImage={mainAccountExample}
      />
      <MainPageInfoSection
        labelText={info2}
        imageObj={statsImage}
        exampleImage={predictingExample}
      />
      <MainPageInfoSection labelText={info3} imageObj={clockImage} exampleImage={paymentsExample} />
      <MainPageInfoSection
        labelText={info4}
        imageObj={calendarImage}
        exampleImage={calendarExample}
      />
      <MainPageAccountsSection labelText={info5} imageObj={accountsImage} tilesArr={tilesArr} />
      <DevicesSection />
      <MainPageBottomSection />
      <Footer />
      {!cookiesInfoRed && <CookieInfoModal hideInfo={hideCookieInfo} />}
    </StyledWrapper>
  );
};

export default MainPageView;
