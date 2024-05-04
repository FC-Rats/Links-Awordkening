import React from 'react';
import { ContainerInfoGame } from './components/organisms/ContainerInfoGame';
import AcceptRefuseFriendRequest from './components/molecules/AcceptRefuseFriendRequest';
import SearchFriends from './components/molecules/SearchFriends';
import { ContainerInfoPlayer } from './components/organisms/ContainerInfoPlayer';
import { ComponentListWords } from './components/molecules/ComponentListWords';
import Stack from '@mui/material/Stack';
import GameType from './components/molecules/GameType';
import { CenteredTitle } from './components/atoms/CenteredTitle';
import { SignIn } from './components/templates/SignIn';
import { SignUp } from './components/templates/SignUp';
import { CaseHomePageContainer } from './components/organisms/CaseHomePageContainer';
import { Rules } from './components/templates/Rules';
import ContainerFriendRequests from './components/organisms/ContainerFriendRequests';
import { TileAccountInfo } from './components/molecules/TileAccountInfo';
import { ContainerEndGame } from './components/organisms/ContainerEndGame';
import ModifyUser from './components/organisms/ModifyUser';
import { SoloGame } from './components/templates/SoloGame';
import { ForgotPassword } from './components/templates/ForgotPassword';
import { ChangePassword } from './components/templates/ChangePassword';
import { HomePage } from './components/templates/HomePage';
import { ChangeParameters } from './components/templates/ChangeParameters';


function App() {
  return (
    <div className="App">
      <CenteredTitle text="Links Awordkening" />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ContainerInfoPlayer />
        <ContainerInfoGame />
      </div>
      <ComponentListWords />
      <ContainerEndGame />
      <AcceptRefuseFriendRequest isAcceptingButton={true} friend={{ "id": 3, "username": "Lolo" }} />
      <SearchFriends />
      <ContainerFriendRequests friends={[{ "id": 3, "username": "Lolo" }, { "id": 4, "username": "Lna" }, { "id": 5, "username": "Léo" }, { "id": 10, "username": "Keke" }]} />
      <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
        < GameType type='solo' />
        < GameType type='multi' />
      </Stack>
      <SignIn />
      <SignUp />
      <CaseHomePageContainer />
      <Rules />
      <TileAccountInfo title={'Parties Jouées'} value={25} subTitle={'au total'} imgUrl={'https://as2.ftcdn.net/v2/jpg/00/99/13/07/1000_F_99130742_OsZsx8ku46AP6NPtguwOTr8bSqgfHM5W.jpg'} imgAlt={'raccoooooon'}/>
      <ModifyUser />
      <SoloGame/>
      <ForgotPassword/>
      <ChangePassword/>
      <HomePage/>
      <ChangeParameters/>
    </div>
  );
}

export default App;
