import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import { ContainerFooter, ContainerFooterWrapper } from './styles'


export function StepperFooter({children}: any) {
    return (
        <ContainerFooter>
            {children}
        </ContainerFooter>
    )
}

export function StepperFooterWrapper({children}: any) {
    return (
        <ContainerFooterWrapper>
            {children}
        </ContainerFooterWrapper>
    )
}