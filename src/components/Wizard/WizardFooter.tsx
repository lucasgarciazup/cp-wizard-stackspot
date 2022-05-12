import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import { ContainerFooter, ContainerFooterWrapper } from './styles'


export function WizardFooter({children}: any) {
    return (
        <ContainerFooter>
            {children}
        </ContainerFooter>
    )
}

export function WizardFooterWrapper({children}: any) {
    return (
        <ContainerFooterWrapper>
            {children}
        </ContainerFooterWrapper>
    )
}