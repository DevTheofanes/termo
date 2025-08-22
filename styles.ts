import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #FFF;
  margin-top: 20px;
  font-weight: bold;
`;

export const InputContainer = styled.div`
    display: flex;
    margin: 20px 0;
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
`;

export const Letter = styled.p`

    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
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
`;

export const KeyboardContainer = styled.div`

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
