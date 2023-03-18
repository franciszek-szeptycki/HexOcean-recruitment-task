import {describe, it, expect, beforeEach} from "vitest";
import { render, screen } from '@testing-library/react';
import FormContainer from "../FormContainer";


describe("FormContainer", () => {

    beforeEach(() => {
        render(<FormContainer />)
    })

    it('renders a form', () => {
        const form = screen.getByTestId('form');
        expect(form).toBeTruthy();
    });

    it('renders a dish name input', () => {
        const dishNameInput = screen.getByText('Dish Type');
        expect(dishNameInput).toBeTruthy();
    })
})