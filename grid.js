let small = document.getElementById('gridlay')
for (i=0; i <200; i++)
{
    let newDiv = document.createElement('div')
    small.appendChild(newDiv)
    if (i % 2 === 0)
    {
        newDiv.classList.add('td')
    }
    else
    {
        newDiv.classList.add('tl')
    }
}
for (i=0; i <10; i++)
    {
        let newDiv = document.createElement('div')
        newDiv.classList.add('taken')
        small.appendChild(newDiv)
    }
let square = document.getElementById('nextUp')
for (i=0; i <16; i++)
{
    let newDiv = document.createElement('div')
    square.appendChild(newDiv)
}