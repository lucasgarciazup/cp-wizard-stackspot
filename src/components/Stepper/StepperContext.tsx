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
interface StepperProviderInterface {
    children: React.ReactElement,
}

export const StepperContext = createContext({} as ContextType)

export const StepperProvider: React.FC<StepperProviderInterface> = ({ children }) => {
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
        <StepperContext.Provider value={{
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
        </StepperContext.Provider>
    )
}

export function useStepper() {
    return useContext(StepperContext);
}