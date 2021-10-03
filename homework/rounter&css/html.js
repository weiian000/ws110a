 export function table9x9()
{
    
    let table = [`<h1>9x9table</h1><br><table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>`]
    for(let i=1;i<=9;i++)
    {
        let row = `<tr> <th>${i}</th>`//顯示出是第幾行
        for(let j=1;j<=9;j++)
        {
            row += `<td>${i*j}</td>`
        }
        row += "</tr>"
        table.push(row)
    }
    return table.join('\n')+"</table>" 
}
