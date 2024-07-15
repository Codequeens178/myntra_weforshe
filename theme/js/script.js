document.addEventListener("DOMContentLoaded", function() {
    const wishlistItems = document.querySelectorAll('.wishlist-item');
    const bagContainer = document.querySelector('.bag');

    wishlistItems.forEach(item => {
        const moveToBagButton = item.querySelector('.move-to-bag');

        moveToBagButton.addEventListener('click', function() {
            // Move the item from wishlist to bag
            const productId = item.getAttribute('data-id');
            moveToBag(productId);
        });
    });

    function moveToBag(productId) {
        // Find the wishlist item with the given product ID
        const wishlistItem = document.querySelector(`.wishlist-item[data-id="${productId}"]`);

        if (wishlistItem) {
            // Clone the wishlist item
            const bagItem = wishlistItem.cloneNode(true);
            
            // Remove the "Move to Bag" button from the cloned item
            const moveToBagButton = bagItem.querySelector('.move-to-bag');
            if (moveToBagButton) {
                moveToBagButton.remove();
            }

            // Add the cloned item to the bag
            bagContainer.appendChild(bagItem);

            // Remove the original item from the wishlist
            wishlistItem.remove();
        }
    }
});
