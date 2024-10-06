import { act, React} from 'react'
import { render, waitFor } from '@testing-library/react'
import Timer from './Timer'
import { describe } from 'node:test';

jest.useFakeTimers();

describe ("Timer Component", () => {
    test("Renders", () => {
        const propsList = [
            {
                time: 90,
                onFinish: jest.fn()
            },
            {
                time: 3,
                onFinish: jest.fn()
            },
            {
                time: 333,
                onFinish: jest.fn()
            }
        ]

        const results = [
            ["01","30"],
            ["00","03"],
            ["05","33"]
        ]

        for (const index in propsList) {
            const component = render(<Timer time={propsList[index].time} onFinish={propsList[index].onFinish} />)
            component.getByText(results[index][0])
            component.getByText(results[index][1])
        }
    })

    test("Reducing time", async () => {
        const props = {
            time: 90,
            onFinish: jest.fn()
        }

        const timeIntervals = [3, 27, 45, 15]
        const results = [
            ["01","27"],
            ["01","00"],
            ["00","15"],
        ]

        const component = render(<Timer time={props.time} onFinish={props.onFinish} />)

        for (const index in timeIntervals) {
            act(() => {
                jest.advanceTimersByTime(1000 * timeIntervals[index]);
            });

            if (index < results.length) {
                await waitFor(() => {
                    expect(component.getByText(results[index][0])).toBeInTheDocument();
                    expect(component.getByText(results[index][1])).toBeInTheDocument();
                })
            } else {
                await waitFor(() => {
                    expect(props.onFinish).toHaveBeenCalledTimes(1)
                })
            }
        }
    })
})