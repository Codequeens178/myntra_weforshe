
        // Function to move item to the bag
        function moveToBag(event) {
            const button = event.target;
            const productElement = button.closest('.product-card');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('.product-name').innerText;
            const productImg = productElement.querySelector('.product-image').src;
            const productPrice = productElement.querySelector('.product-price').childNodes[0].textContent.trim();
            const productOldPrice = productElement.querySelector('.product-old-price').innerText;

            // Create an object for the product
            const product = {
                id: productId,
                name: productName,
                img: productImg,
                price: productPrice,
                oldPrice: productOldPrice
            };

            // Get the bag items from localStorage
            let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];

            // Add the product to the bag items
            bagItems.push(product);

            // Update the bag items in localStorage
            localStorage.setItem('bagItems', JSON.stringify(bagItems));

            // Optionally, remove the item from the wishlist UI
            productElement.remove();

            // Update the Bag UI
            updateBagUI();
        }

        // Function to update the bag UI
        function updateBagUI() {
            const bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
            const bagContainer = document.querySelector('.bag-container');

            // Clear the bag container
            bagContainer.innerHTML = '';

            // Populate the bag container with bag items
            bagItems.forEach(item => {
                const bagItemElement = document.createElement('div');
                bagItemElement.classList.add('bag-item');
                bagItemElement.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <p>${item.name}</p>
                    <p>${item.price} <span>${item.oldPrice}</span></p>
                `;
                bagContainer.appendChild(bagItemElement);
            });
        }

        // Attach event listeners to all "Move to Bag" buttons
        document.addEventListener('DOMContentLoaded', () => {
            const moveToBagButtons = document.querySelectorAll('.move-to-bag');
            moveToBagButtons.forEach(button => {
                button.addEventListener('click', moveToBag);
            });

            // Initialize the bag UI
            updateBagUI();
        });