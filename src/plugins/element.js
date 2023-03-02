import {
    Button,
    Message,
    DatePicker,
    Input,
    InputNumber,
    Table,
    TableColumn,
    Pagination,
    Dialog,
    Select,
    TimeSelect,
    Option,
    OptionGroup,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Radio,
    RadioGroup,
    RadioButton,
    Loading,
    Form,
    Steps,
    Step,
    FormItem,
    Switch,
    Autocomplete,
    Tree,
    Upload,
    Tooltip,
} from 'element-ui';

const element = {
    install: function (Vue) {
        Vue.use(Pagination);
        Vue.use(Button);
        Vue.use(DatePicker);
        Vue.use(Input);
        Vue.use(InputNumber);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Dialog);
        Vue.use(Select);
        Vue.use(TimeSelect);
        Vue.use(Option);
        Vue.use(OptionGroup);
        Vue.use(Checkbox);
        Vue.use(CheckboxButton);
        Vue.use(CheckboxGroup);
        Vue.use(Dropdown);
        Vue.use(Radio);
        Vue.use(RadioGroup);
        Vue.use(RadioButton);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Loading.directive);
        Vue.use(Form);
        Vue.use(Steps);
        Vue.use(Step);
        Vue.use(FormItem);
        Vue.use(Switch);
        Vue.use(Autocomplete);
        Vue.use(Tree);
        Vue.use(Upload);
        Vue.use(Tooltip);
        
        Vue.prototype.$loading = Loading.service;

        Vue.prototype.$message = Message;
    }
}

export default element
