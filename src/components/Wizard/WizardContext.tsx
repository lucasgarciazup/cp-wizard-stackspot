import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Step = string;
export type ContextType = {
    steps: Step[],
    current: Step,
    selectCurrent: (step: Step) => void,
    nextStep: () => void,
    skipStep: () => void,
    prevStep: () => void,
    updateSteps: (steps: Step[]) => void,
    addFinished: (step: Step) => void,
    removeFinished: (step: Step) => void,
    finished: Step[];
}

type CurrentType = number;

export const WizardContext = createContext({} as ContextType)

interface WizardProviderInterface {
    children: React.ReactElement,
}

export const WizardProvider: React.FC<WizardProviderInterface> = ({ children }) => {
    const [steps, setSteps] = useState<Step[]>([]);
    const [current, setCurrent] = useState<Step>('');
    const [finished, setFinished] = useState<Step[]>([]);

    const selectCurrent = useCallback((step: Step) => {
        setCurrent(step)
    }, []);

    const updateSteps = useCallback((steps: Step[]) => {
        setSteps(steps)
    }, []);

    const addFinished = useCallback((step: Step) => {
        setFinished(state => {
            const set = new Set(state).add(step);
            return [...set]
        })
    }, []);

    const removeFinished = useCallback((step: Step) => {
        setFinished(state => state.filter(x => x !== step))
    }, []);

    const nextStep = useCallback(() => {
        setCurrent(state => steps[steps.findIndex(x => x === state) + 1] || state);
        addFinished(current)
    }, [current, steps]);

    const prevStep = useCallback(() => {
        setCurrent(state => steps[steps.findIndex(x => x === state) - 1] || state);
        removeFinished(current)
    }, [current, steps]);

    const skipStep = useCallback(() => {
        nextStep();
    }, []);

    return (
        <WizardContext.Provider value={{
            steps,
            current,
            selectCurrent,
            nextStep,
            skipStep,
            prevStep,
            updateSteps,
            finished,
            addFinished,
            removeFinished
        }}>
            {children}
        </WizardContext.Provider>
    )
}

export const WizardCallback = WizardContext.Consumer;

export function useWizard() {
    return useContext(WizardContext);
}