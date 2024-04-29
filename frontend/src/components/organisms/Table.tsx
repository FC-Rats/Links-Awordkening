import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

var customers = [
    {
        "id": 1000,
        "name": "James Butt",
        "country": {
            "name": "Algeria",
            "code": "dz"
        },
        "company": "Benton, John B Jr",
        "date": "2015-09-13",
        "status": "unqualified",
        "verified": true,
        "activity": 17,
        "representative": {
            "name": "Ioni Bowcher",
            "image": "ionibowcher.png"
        },
        "balance": 70663
    },
    {
        "id": 1001,
        "name": "Josephine Darakjy",
        "country": {
            "name": "Egypt",
            "code": "eg"
        },
        "company": "Chanay, Jeffrey A Esq",
        "date": "2019-02-09",
        "status": "proposal",
        "verified": true,
        "activity": 0,
        "representative": {
            "name": "Amy Elsner",
            "image": "amyelsner.png"
        },
        "balance": 82429
    }
];

function Table() {
    return (
        <></>
/*         <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
            globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header} emptyMessage="No customers found.">
            <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
            <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
            <Column header="Agent" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
            <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
            <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
        </DataTable> */
    )
}

export default Table