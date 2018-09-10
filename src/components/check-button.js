import styled from 'styled-components'

export const CheckButton = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 14px;
  height: 14px;
  margin: 5px;
  background: #f3f9fb;
  border: 1px solid #daeaef;
  border-radius: 0;
  outline: 0;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    opacity: 0;
    transform: scale(0.3);
    transition: all 100ms ease-in-out;
  }
  &:active {
  }
  &:active:after {
    opacity: 1;
    transform: scale(0.6);
  }
  &:checked:after {
    opacity: 1;
    transform: scale(1);
    content: '🗸';
    color: #1dd9d5;
    font-size: 20px;
    top: -7px;
  }
`

