import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import customersData from '../../assets/data/customers.json';
import '../../assets/css/Table.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Button } from '@mui/material';
import '../../assets/css/AcceptRefuseFriendRequest.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';

function Table() {
    const [customers, setCustomers] = useState(customersData);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'email': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'user.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'birthYear': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'tokenR': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'visibility': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'verified': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'admin': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'averageScore': { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [scoreRange, setScoreRange] = useState({ min: 0, max: 100 });

    useEffect(() => {
        if (customers.length > 0) {
            const scores = customers.map(customer => customer.averageScore);
            const minScore = Math.min(...scores);
            const maxScore = Math.max(...scores);
            setScoreRange({ min: minScore, max: maxScore });
        }
    }, [customers]);

    const visibilities = [
        'private', 'public', 'friends'
    ];

    const booleanOptions = [
        { label: 'Oui', value: 'true' },
        { label: 'Non', value: 'false' }
    ];


    useEffect(() => {
        //fetchData() --> setCustomers;
        setLoading(false);
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div className="title-table">
                <h5>Utilisateurs</h5>
                <span>
                    <SearchIcon />
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher par mots-clés" />
                </span>
            </div>
        )
    }

    const userBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="profilPicture" src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.user.profilPicture}`} width={30} />
                <span className="image-text">{rowData.user.name}</span>
            </React.Fragment>
        );
    }

    const idFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} />
    }

    const birthYearFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} />
    }

    const visibilityBodyTemplate = (rowData) => {
        return <span className={`customer-badge visibility-${rowData.visibility}`}>{rowData.visibility}</span>;
    }

    const verifiedBodyTemplate = (rowData) => {
        return (
            <span className={`customer-badge verified-${rowData.verified}`}>
                {rowData.verified ? 'Oui' : 'Non'}
            </span>
        );
    }

    const adminBodyTemplate = (rowData) => {
        return (
            <span className={`customer-badge admin-${rowData.admin}`}>
                {rowData.admin ? 'Oui' : 'Non'}
            </span>
        );
    }

    const tokenRBodyTemplate = (rowData) => {
        return rowData.tokenR ? rowData.tokenR : 'NULL';
    }

    const visibilityFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={visibilities} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={visibilityItemTemplate} placeholder="Choisissez une visibilité" className="p-column-filter" showClear />;
    }

    const verifiedFilterTemplate = (options) => {
        return <Dropdown value={String(options.value)} options={booleanOptions}
            onChange={(e) => options.filterCallback(e.value === 'true')}
            placeholder="Choisissez une option" className="p-column-filter"
            showClear />;
    }

    const adminFilterTemplate = (options) => {
        return <Dropdown value={String(options.value)} options={booleanOptions}
            onChange={(e) => options.filterCallback(e.value === 'true')}
            placeholder="Choisissez une option" className="p-column-filter"
            showClear />;
    }

    const visibilityItemTemplate = (option) => {
        return <span className={`customer-badge visibility-${option}`}>{option}</span>;
    }

    const averageScoreFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3" min={scoreRange.min} max={scoreRange.max}></Slider>
                <div className="slider-averageScore">
                    <span>{options.value ? options.value[0] : scoreRange.min}</span>
                    <span>{options.value ? options.value[1] : scoreRange.max}</span>
                </div>
            </React.Fragment>
        )
    }

    const actionBodyTemplate = () => {
        return <Button variant="contained" className="acceptRefuseFriendRequest acceptRefuseFriendRequest-accept"><ModeEditIcon /></Button>;
    }

    const header = renderHeader();

    return (
        <>
            <div className="datatable">
                <div className="card">
                    <DataTable value={customers} paginator className="p-datatable-customers" header={header} rows={10}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id" rowHover selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)}
                        filters={filters} filterDisplay="menu" loading={loading}
                        globalFilterFields={['id', 'email', 'user.name', 'tokenR', 'birthYear', 'visibility', 'verified', 'admin']} emptyMessage="Aucun utilisateur trouvé."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                        <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>
                        <Column field="id" header="ID" sortable dataType="numeric" style={{ minWidth: '5rem' }} filter filterElement={idFilterTemplate} />
                        <Column field="email" header="Adresse mail" sortable filter filterPlaceholder="Rechercher par adresses mail" style={{ minWidth: '12rem' }} />
                        <Column field="user.name" header="Nom" sortable filterField="user.name" style={{ minWidth: '10rem' }} body={userBodyTemplate} filter filterPlaceholder="Rechercher par nom" />
                        <Column field="birthYear" header="Naissance" sortable dataType="numeric" style={{ minWidth: '5rem' }} filter filterElement={birthYearFilterTemplate} />
                        <Column field="tokenR" header="Token" sortable filter filterPlaceholder="Rechercher par token" style={{ minWidth: '6rem' }} body={tokenRBodyTemplate} />
                        <Column field="visibility" header="Visibilité" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '6rem' }} body={visibilityBodyTemplate} filter filterElement={visibilityFilterTemplate} />
                        <Column field="verified" header="Vérifié" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '5rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                        <Column field="admin" header="Admin" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '5rem' }} body={adminBodyTemplate} filter filterElement={adminFilterTemplate} />
                        <Column field="averageScore" header="Score" sortable showFilterMatchModes={false} style={{ minWidth: '5rem' }} filter filterElement={averageScoreFilterTemplate} />
                        <Column header="Modifier" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </>
    );
}

export default Table