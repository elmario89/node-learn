function autocomplete(input, latInput, lngInput, image) {
    if (!input) return;

    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();

        if (!place.photos) return;
        place.photos.forEach((item, index) => renderImages(place.photos[index].getUrl({maxWidth: 250}),image));

        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    });

    input.on('keydown', (e) => {
        if (e.keyCode === 13) e.preventDefault();
    });
}

function renderImages(url, container) {
    const imageEl = document.createElement('img');
    imageEl.src = url;
    container.appendChild(imageEl);
}

export default autocomplete;