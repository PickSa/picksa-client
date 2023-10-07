import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import CloseButton from '../../assets/evaluate/CloseButton.png'
import Checkbox from '../../assets/evaluate/Checkbox.png'
 
 
function SideBar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const outside = useRef<any>();
 
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  });
 
  const handlerOutsie = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };
 
  const toggleSide = () => {
    setIsOpen(false);
  };
 
  return (
    <SideBarWrap id="sidebar" ref={outside} className={isOpen ? 'open' : ''}>
      
      <ApplicantList>지원자 목록
      <img
        src={CloseButton}
        alt="close"
        onClick={toggleSide}
        onKeyDown={toggleSide}
      />
      </ApplicantList>
      <ApplicantByPart>
        <Part>기획
          <NameTag>에이드리안
          <img
              src={Checkbox}
              alt="check"
            />
          </NameTag>
        </Part>
        <Part>디자인
          <NameTag>에이드리안
          <img
              src={Checkbox}
              alt="check"
            />
          </NameTag>
        </Part>
        <Part>프론트엔드
          <NameTag>에이드리안
          <img
              src={Checkbox}
              alt="check"
            />
          </NameTag>
        </Part>
        <Part>백엔드
          <NameTag>에이드리안
          <img
              src={Checkbox}
              alt="check"
            />
          </NameTag>
        </Part>

      </ApplicantByPart>
    </SideBarWrap>
  );
}
 
export default SideBar;
const SideBarWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 200px;
height: 1300px;
top: 80px;

background: #FFFFFF;
  z-index: 5;
  padding: 12px;
  border-radius: 0px 15px 15px 0px;
  left: -55%;
  
  position: absolute;
  transition: 0.5s ease;
  &.open {
    left: 0;
    transition: 0.2s ease;
  }
`;
const ApplicantList = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 10px;
gap: 20px;
width: 150px;
height: 44px;
background: #FFFFFF;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
/* identical to box height */
text-align: center;

color: #000000;
`;

const ApplicantByPart = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 0px 10px;
gap: 20px;

height: 946px;
`;
const Part = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
gap: 12px;

width: 150px;
background: #DDDDDD;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
/* identical to box height */
text-align: center;

color: #000000;

`;
const NameTag = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 500;
font-size: 13px;
line-height: 150%;
/* identical to box height, or 20px */

color: #000000;


`;



