

class USGSOverlay {
    constructor(bounds, image, map) {
        // Initialize all properties.
        // this.OverlayView = new OverlayView();
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;


        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
        // this.onAdd();
    };
    onAdd = function () {

        var div = document.createElement('div');
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';
        div.style.top = '100px';

        // Create the img element and attach it to the div.
        var img = document.createElement('span');
        // img.src = "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwixsK3k_ZbmAhV_yosBHST_BbwQjRx6BAgBEAQ&url=https%3A%2F%2Fhinhanhdephd.com%2Fmeo-con-dep-voi-nhung-anh-nen-meo-con-de-thuong%2F&psig=AOvVaw2oPfl0sKeXkRAEbyJrJM6d&ust=1575376729329058";
        // img.style.width = '100%';
        // img.style.height = '100%';
        img.style.position = 'absolute';
        // img.style.height = '100px';
        img.style.background = 'red';
        div.style.top = '100px';
        img.style.whiteSpace = 'nowrap';

        img.innerHTML = "hello dai ca"

        div.appendChild(img);

        this.div_ = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
    };
    draw = function () {

        // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
    };
    onRemove = function () {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };
    hide = function () {
        if (this.div_) {
            // The visibility property must be a string enclosed in quotes.
            this.div_.style.visibility = 'hidden';
        }
    };

    show = function () {
        if (this.div_) {
            this.div_.style.visibility = 'visible';
        }
    };
    toggle = function () {
        if (this.div_) {
            if (this.div_.style.visibility === 'hidden') {
                this.show();
            } else {
                this.hide();
            }
        }
    };
    toggleDOM = function () {
        if (this.getMap()) {
            // Note: setMap(null) calls OverlayView.onRemove()
            this.setMap(null);
        } else {
            this.setMap(this.map_);
        }
    };
}

export default USGSOverlay;