import * as ko from 'knockout';

// App State

export const testing = false;

export interface IPage {
    id: string;
    component: string;
    title: string;
    data: any;
    busy: boolean;
    sequence: number;
}

export interface IState {
    pages$: ko.ObservableArray<IPage>;
}

export const defaultPages: IPage[] = [
    {
        id: 'e1p-ab-inquiry',
        component: 'e1p-page',
        title: 'Address Book Inquiry',
        busy: false,
        sequence: 0,
        data: null
    },
    {
        id: 'e1p-open-pos',
        component: 'e1p-page',
        title: 'Open Purchase Orders',
        busy: false,
        sequence: 1,
        data: null
    },
    {
        id: 'e1p-coa-tree',
        component: 'e1p-page',
        title: 'Chart of Accounts',
        busy: false,
        sequence: 2,
        data: null
    },
    {
        id: 'e1p-route-sample',
        component: 'e1p-page',
        title: 'Route Sample',
        busy: false,
        sequence: 3,
        data: null
    }
];
