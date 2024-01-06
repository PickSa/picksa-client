import React, { useEffect, useState } from 'react'
import { ArticleFlex, PageFlex } from '../styles/globalStyle'
import NavBar from '../components/common/NavBar'
import styled from 'styled-components'
import MakeQuest from '../components/docquest/MakeQuest'
import SortQuest from '../components/docquest/SortQuest'
import DeleteModal from '../components/modals/DeleteModal'

const DocQuest = () => {
    const [currentTab, setCurrentTab] = useState('list');
    const [listActive, setListActive] = useState('active');
    const [sortActive, setSortActive] = useState('');

    const [delModalIsOpen, setDelModalIsOpen] = useState(false);
    const [deletedId, setDeletedId] = useState<number>();

    useEffect(() => {
      if(currentTab === 'list'){
        setListActive('active');
        setSortActive('');
      } else {
        setListActive('');
        setSortActive('active');
      }
    }, [currentTab]);

  return (
    <PageFlex className='docquest-background'>
      {
        delModalIsOpen === true && <DeleteModal deletedId={deletedId!} setDelModalIsOpen={setDelModalIsOpen} />
      }
      <NavBar where="lionlist" />
      <ArticleFlex>
        <TabWrapper>
            <TabBtn className={listActive} onClick={() => setCurrentTab('list')}>질문 목록</TabBtn>
            <TabBtn className={sortActive} onClick={() => setCurrentTab('sort')}>질문 순서</TabBtn>
        </TabWrapper>
        <ContentBackground>
          {
            currentTab === 'list' ? 
            <MakeQuest 
            delModalIsOpen={delModalIsOpen}
            setDeletedId={setDeletedId}
            setDelModalIsOpen={setDelModalIsOpen} /> 
            : 
            <SortQuest />
          }
        </ContentBackground>
      </ArticleFlex>
    </PageFlex>
    
  )
}

export default DocQuest

const TabWrapper = styled.div`
    display: flex;
`

const TabBtn = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bolder;
  padding: 1rem 1.5rem 1rem 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  margin-top: 2rem;
  color: rgba(3, 104, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.75);
  &.active{
    color: rgba(3, 104, 255, 1);
    background-color: #fff;
  }
  &:hover{
    cursor: pointer;
  }
`

const ContentBackground = styled.div`
    display: flex;
    background-color: #FFF;
`