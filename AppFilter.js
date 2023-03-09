import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { act } from 'react-dom/test-utils'

import AppFilter from "../AppFilter"

describe('AppFilter', () => {
    it('should filter elements when select filter value', async () => {
		render(<AppFilter />)

		const select = screen.getByDisplayValue('...')

		await waitFor(() => {
			expect(select).toBeInTheDocument()
		})

		expect(screen.getByText('4 tasks remaining')).toBeInTheDocument()
		expect(screen.getAllByRole('listitem').length).toEqual(4)

		fireEvent.change(select, { target: { value: 'done' } })

		await waitFor(() => {
			expect(screen.getByDisplayValue('Done')).toBeInTheDocument()
		})
		expect(screen.getByText('2 tasks remaining')).toBeInTheDocument()
		expect(screen.getAllByRole('listitem').length).toEqual(2)
	})

	it('should mark task as done when toggle that task', () => {
		render(<AppFilter />)

		const allNotDoneTasks = screen.getAllByRole('checkbox', { checked: false })

		act(() => {
			allNotDoneTasks[0].click() // mark first not-done task in list to done
		})

		expect(screen.getAllByRole('checkbox', { checked: false }).length).toEqual(allNotDoneTasks.length - 1)
	})

	it('should add item when click add todo button', async () => {
		// TODO: to be implemented by student

        render(<AppFilter />)

        const add = screen.getAllByText('Add')
        const text = screen.getByPlaceholderText('Your task')

        fireEvent.change(text, {target : {value : '1234'}})
        act(()=>{
            add[0].click()
        })

        expect(screen.getByText('5 tasks remaining')).toBeInTheDocument()
        expect(screen.getAllByRole('listitem').length).toEqual(5)



	})

	it('should delete item when click delete button', async () => {
		// TODO: to be implemented by student
        render(<AppFilter />)

        const del = screen.getAllByText('Delete')
        
        act(()=>{
            del[0].click()
        })

     
        expect(screen.getByText('3 tasks remaining')).toBeInTheDocument()
        expect(screen.getAllByRole('listitem').length).toEqual(3)


	})



})