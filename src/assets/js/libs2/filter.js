// $(function () {
// $('.filter').find('li:nth-child(1)').trigger('click');
// });

/*

<ul class="looked__filter">
    <li class="looked__filter_tab" data-id="standard">хиты</li><span></span>
    <li class="looked__filter_tab" data-id="new">новинки</li><span></span>
</ul>
<div class="container">
    <div class="card standard"></div>
    <div class="card sale"></div>
</div>

*/


if (document.querySelectorAll(".looked__filter").length) {
    const list = document.querySelector('.looked__filter'),
        items = document.querySelectorAll('.card'),
        listItems = document.querySelectorAll('.looked__filter_tab')

    function filter() {
        list.addEventListener('click', event => {
            const targetId = event.target.dataset.id
            const target = event.target

            if (target.classList.contains('looked__filter_tab')) {
                listItems.forEach(listItem => listItem.classList.remove('active'))
                target.classList.add('active')
            }

            switch (targetId) {
                case 'hits':
                    getItems(targetId);
                    break;
                case 'new':
                    getItems(targetId);
                    break;
                case 'sale':
                    getItems(targetId);
                    break;
            }
        });
    }
    filter();

    $(function () {
        $('.looked__filter').find('li:nth-child(1)').trigger('click');
    });

    function getItems(className) {
        items.forEach(item => {
            if (item.classList.contains(className)) {
                item.style.display = 'grid'
            } else {
                item.style.display = 'none'
            }
        });
    }
}