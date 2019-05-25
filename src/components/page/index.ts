// Data Page Component
import './style.scss';
import * as ko from 'knockout';
import { IPage } from '../../state';

const component = 'e1p-page';

let vm: ViewModel;

class ViewModel {
    page: IPage;
    src$: ko.Observable<string>;
    loading$ = ko.observable(true);
    load() {
        vm.loading$(false);
    }
    descendantsComplete = () => {
    }
    constructor(params: { page: IPage }) {
        vm = this;
        this.page = params.page;
        this.src$ = ko.observable(`/e1p-demo/pages/${vm.page.id}/home.html`);
    }
}

ko.components.register(component, {
    viewModel: {
        createViewModel: (params, componentInfo) => {
            const vm = new ViewModel(params);
            const sub = (ko as any).bindingEvent
                .subscribe(componentInfo.element, 'descendantsComplete', vm.descendantsComplete);
            (vm as any).dispose = () => sub.dispose();
            return vm;
        }
    },
    template: require('./template.html')
});
