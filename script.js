dragula([
	document.getElementById('1'),
	document.getElementById('2'),
	document.getElementById('3'),
	document.getElementById('4'),
	document.getElementById('5')
])
	.on('drag', function (el) {
		el.classList.add('is-moving');
	})
	.on('dragend', function (el) {
		el.classList.remove('is-moving');
		window.setTimeout(function () {
			el.classList.add('is-moved');
			window.setTimeout(function () {
				el.classList.remove('is-moved');
			}, 600);
			check_count()
		}, 100);
	});

function search() {
	const searchTerm = searchInput.value.toLowerCase();
	const cards = document.querySelectorAll(".drag-item");
	cards.forEach(card => {
		const name = card.textContent.toLowerCase();
		if (name.includes(searchTerm)) {
			card.style.display = "";
		} else {
			card.style.display = "none";
		}
	});
}

const searchInput = document.getElementById("searchbar");
searchInput.addEventListener("input", search);

function check_count() {
	let columns = document.getElementsByClassName('drag-column');
	Array.from(columns).forEach((column) => {
		let count = column.getElementsByClassName('item-count')[0];
		count.innerHTML = column.getElementsByClassName('drag-item').length;
	})
}
check_count()

document.getElementById('add-card').addEventListener('submit', function (event) {
	event.preventDefault()
	var form = document.getElementById('add-card');
	if (form.checkValidity()) {
		add_card()
	} else {
		form.reportValidity()
	}
});

function add_card() {
	var dragItem = document.querySelector('.dummy .drag-item');
	var clone = dragItem.cloneNode(true);
	clone.getElementsByClassName('card-name')[0].innerHTML = document.getElementById('modal-name').value
	var container = document.getElementById(document.getElementById('modal-status').value)
	container.appendChild(clone);
	document.getElementsByClassName('model-close')[0].click()
}
