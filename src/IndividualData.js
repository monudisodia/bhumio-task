import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.id}</th>
            <th>{individualExcelData.first}</th>
            <th>{individualExcelData.last}</th>
            <th>{individualExcelData.email}</th>
            <th>{individualExcelData.phone}</th>
        </>
    )
}