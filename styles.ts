import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #FFF;
  margin-top: 20px;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

export const InputContainer = styled.div`
    display: flex;
    margin: 20px 0;
    @media (max-width: 480px) {
      margin: 12px 0;
    }
`;

export const InputButton = styled.button`
border: 1px solid  #3A7FA3;
background-color: #3A7FA3;
    color: #fff;
    width: 120px;
    height: 48px;
    margin-left: 12px;
    font-weight: bold;
    font-size: 14px;
    @media (max-width: 480px) {
      width: 80px;
      height: 40px;
      font-size: 12px;
      margin-left: 8px;
    }
`

export const Input = styled.input`
padding: 8px 12px;
 height: 48px;
 color:#222;
`;

export const Word = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
gap: 8px;
margin-bottom: 8px;
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const Letter = styled.p`

    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
      font-size: 0.875rem;
    }
`

export const styleLetterStrong: React.CSSProperties = {
    border: '1px solid #f9f9f9',
    color: '#f9f9f9'
}

export const styleLetterAlmost: React.CSSProperties = {
    backgroundColor: '#d3ad69',
    color: '#fff'
}

export const styleLetterSuccess: React.CSSProperties = {
    backgroundColor: '#3aa394',
    color: '#fff'
}

export const Message = styled.p`
    margin: 12px 0;
    color: #fff;
`


export const StyledInput = styled.input`
    width: 48px;
    height: 48px;
  margin: 5px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ccc;
  color: #222;
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin: 3px;
    font-size: 14px;
  }
`;

export const KeyboardContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const KeyboardLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const KeyboardLetter = styled.button`
    width: 48px;
    height: 48px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px;
    font-weight: bold;
    color: #fff;
    @media (max-width: 480px) {
      width: 26px;
      height: 32px;
      margin: 2px;
      font-size: 12px;
    }
`;

export const styleLetterKeyBoardStrong: React.CSSProperties = {
    // backgroundColor: 'red',
    // border: 0
    opacity: 0.5
}

export const styleLetterKeyBoardAlmost: React.CSSProperties = {
    backgroundColor: '#d3ad69',
    border: 0
}

export const styleLetterKeyBoardSuccess: React.CSSProperties = {
    backgroundColor: '#3aa394',
    border: 0,
}

export const styleLetterKeyBoardUnknown: React.CSSProperties = {}
