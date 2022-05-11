import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
`
export const Container = styled.div`
  background: #F7F7FA;
  display: flex;
  width: 100%;
  padding: 48px 48px 20px 48px;

  display: flex;
  flex-direction: column;
  
  justify-content: space-between;
`;

export const SideMenu = styled.div`
    width: 100%;
    max-width: 33%;
    display: flex;
    margin: 100px 50px;
`

export const StepList = styled.ul`
    color: #1C1C1E;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
`

export const StepIconBox = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: solid 3px;

    svg {
        zoom: 1.5;
        transform: translateY(20%) translateX(20%);
    }
`

export const Step = styled.li`
    cursor: pointer;
    
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    display: flex;
    align-content: center;
    align-items: center;


    gap: 10px;    

    &:not(:first-child) { 
        div::before {
            content: "";
            width: 3px;
            height: 20px;
            position: fixed;
            border-radius: 235px;
            margin: -28px 8px;
        }
    }
    &.completed > ${StepIconBox} {
        background : #F56300;
        border-color: #F56300;
        
        ::before {
            background: #F56300;
        }
    }

    &.current { 
        font-weight: bold
    }

    &.current > ${StepIconBox}{
        border-color: #007AFF;
        ::before {
            background: #007AFF;
        }
    }

    &.disabled {
        color: #D5D5D5;
        cursor: not-allowed !important;
    }

    &.disabled > ${StepIconBox}{
        border-color: #D5D5D5;
        ::before {
            background: #D5D5D5;
        }
    }
    `
export const ContainerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`

export const ContainerFooterWrapper = styled.div`
    display: flex;
    gap: 20px;
`
