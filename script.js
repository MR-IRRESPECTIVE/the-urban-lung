// --- Mobile Menu ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
const mobileMenuLinks = mobileMenu.querySelectorAll('a, button');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Main Modal Handling ---
const mapModal = document.getElementById('map-modal');
const calculatorModal = document.getElementById('calculator-modal');
const wasteSorterModal = document.getElementById('waste-sorter-modal');

const openMapBtn = document.getElementById('open-map-btn');
const mobileOpenMapBtn = document.getElementById('mobile-open-map-btn');
const closeMapBtn = document.getElementById('close-map-btn');

const openCalculatorBtn = document.getElementById('open-calculator-btn');
const mobileOpenCalculatorBtn = document.getElementById('mobile-open-calculator-btn');
const closeCalculatorBtn = document.getElementById('close-calculator-btn');

const openSorterBtn = document.getElementById('open-sorter-btn');
const mobileOpenSorterBtn = document.getElementById('mobile-open-sorter-btn');
const closeSorterBtn = document.getElementById('close-sorter-btn');

openMapBtn.addEventListener('click', () => mapModal.classList.remove('hidden'));
mobileOpenMapBtn.addEventListener('click', () => mapModal.classList.remove('hidden'));
closeMapBtn.addEventListener('click', () => mapModal.classList.add('hidden'));

openCalculatorBtn.addEventListener('click', () => calculatorModal.classList.remove('hidden'));
mobileOpenCalculatorBtn.addEventListener('click', () => calculatorModal.classList.remove('hidden'));
closeCalculatorBtn.addEventListener('click', () => calculatorModal.classList.add('hidden'));

openSorterBtn.addEventListener('click', () => wasteSorterModal.classList.remove('hidden'));
mobileOpenSorterBtn.addEventListener('click', () => wasteSorterModal.classList.remove('hidden'));
closeSorterBtn.addEventListener('click', () => wasteSorterModal.classList.add('hidden'));


// --- Filter Detail Modal Handling ---
const preFilterCard = document.getElementById('pre-filter-card');
const charcoalFilterCard = document.getElementById('charcoal-filter-card');
const fineFilterCard = document.getElementById('fine-filter-card');

const preFilterModal = document.getElementById('pre-filter-modal');
const charcoalFilterModal = document.getElementById('charcoal-filter-modal');
const fineFilterModal = document.getElementById('fine-filter-modal');

const closeFilterModalBtns = document.querySelectorAll('.close-filter-modal-btn');

preFilterCard.addEventListener('click', () => preFilterModal.classList.remove('hidden'));
charcoalFilterCard.addEventListener('click', () => charcoalFilterModal.classList.remove('hidden'));
fineFilterCard.addEventListener('click', () => fineFilterModal.classList.remove('hidden'));

closeFilterModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        preFilterModal.classList.add('hidden');
        charcoalFilterModal.classList.add('hidden');
        fineFilterModal.classList.add('hidden');
    });
});

// --- Scaling Up Modal Handling ---
const industrialCard = document.getElementById('industrial-card');
const towersCard = document.getElementById('towers-card');
const hvacCard = document.getElementById('hvac-card');

const industrialModal = document.getElementById('industrial-modal');
const towersModal = document.getElementById('towers-modal');
const hvacModal = document.getElementById('hvac-modal');

const closeScalingModalBtns = document.querySelectorAll('.close-scaling-modal-btn');

industrialCard.addEventListener('click', () => industrialModal.classList.remove('hidden'));
towersCard.addEventListener('click', () => towersModal.classList.remove('hidden'));
hvacCard.addEventListener('click', () => hvacModal.classList.remove('hidden'));

closeScalingModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        industrialModal.classList.add('hidden');
        towersModal.classList.add('hidden');
        hvacModal.classList.add('hidden');
    });
});


// --- General Modal Closing Logic ---
const allModals = [mapModal, calculatorModal, wasteSorterModal, preFilterModal, charcoalFilterModal, fineFilterModal, industrialModal, towersModal, hvacModal];

// Close any modal if clicking on the background overlay
window.addEventListener('click', (event) => {
    allModals.forEach(modal => {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    });
});

// Close any open modal with the "Escape" key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        allModals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
});


// --- Pollution Footprint Calculator ---
const calculateBtn = document.getElementById('calculate-btn');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultScore = document.getElementById('result-score');
const resultTips = document.getElementById('result-tips');
const calculatorError = document.getElementById('calculator-error');

calculateBtn.addEventListener('click', () => {
    const travelAnswer = document.querySelector('input[name="travel"]:checked');
    const acAnswer = document.querySelector('input[name="ac"]:checked');
    const plasticAnswer = document.querySelector('input[name="plastic"]:checked');

    if (!travelAnswer || !acAnswer || !plasticAnswer) {
        calculatorError.classList.remove('hidden');
        return;
    }
    calculatorError.classList.add('hidden');

    let totalScore = 0;
    totalScore += parseInt(travelAnswer.dataset.score);
    totalScore += parseInt(acAnswer.dataset.score);
    totalScore += parseInt(plasticAnswer.dataset.score);
    
    let resultCategory = '';
    let resultColorClass = '';
    let personalizedTips = `
        <p class="font-bold text-lg mb-2">Here are your personalized tips:</p>
        <div class="border-l-4 p-4 rounded-r-lg bg-gray-50">
            <p><strong class="text-gray-700">For your travel habits:</strong> ${travelAnswer.dataset.tip}</p>
        </div>
        <div class="border-l-4 p-4 rounded-r-lg bg-gray-50">
            <p><strong class="text-gray-700">For your AC usage:</strong> ${acAnswer.dataset.tip}</p>
        </div>
        <div class="border-l-4 p-4 rounded-r-lg bg-gray-50">
            <p><strong class="text-gray-700">For your packaging choices:</strong> ${plasticAnswer.dataset.tip}</p>
        </div>
    `;

    if (totalScore <= 10) {
        resultCategory = 'Low Footprint';
        resultColorClass = 'bg-green-100 border-green-500';
    } else if (totalScore <= 20) {
        resultCategory = 'Medium Footprint';
        resultColorClass = 'bg-yellow-100 border-yellow-500';
    } else {
        resultCategory = 'High Footprint';
        resultColorClass = 'bg-red-100 border-red-500';
    }
    
    resultContainer.className = 'mt-8 p-6 rounded-lg text-center border-t-4 ' + resultColorClass;
    resultTitle.textContent = 'Your Result: ' + resultCategory;
    resultScore.textContent = `Your total score is ${totalScore}. The lower the score, the better!`;
    resultTips.innerHTML = personalizedTips;
    resultContainer.classList.remove('hidden');

    resultContainer.scrollIntoView({ behavior: 'smooth' });
});


// --- Waste Sorter Logic ---
const wasteSearchInput = document.getElementById('waste-search-input');
const wasteResultContainer = document.getElementById('waste-result-container');
const quickSearchButtons = document.querySelectorAll('.waste-quick-search');

let wasteData = {}; // This will be filled with data from the JSON file.

// Function to load the waste data from an external file
async function loadWasteData() {
    // Disable the search input while loading
    wasteSearchInput.disabled = true;
    wasteSearchInput.placeholder = "Loading database...";
    try {
        const response = await fetch('waste-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        wasteData = await response.json();
        console.log("Waste database loaded successfully!");
        // Enable the search input after loading
        wasteSearchInput.disabled = false;
        wasteSearchInput.placeholder = "e.g., plastic bottle, newspaper, battery...";
    } catch (error) {
        console.error("Could not load waste data:", error);
        wasteResultContainer.innerHTML = `<p class="text-red-500 text-center">Error: Could not load the waste item database. Please check the file name and content.</p>`;
        wasteSearchInput.placeholder = "Database failed to load";
    }
}

// Load the data as soon as the script runs
loadWasteData();

const displayWasteResult = (item) => {
    const searchTerm = item.toLowerCase().trim();
    if (!searchTerm) return; // Do nothing if search is empty

    let result = null;
    let matchedKey = '';

    // Direct match check first for accuracy
    if (wasteData[searchTerm]) {
        result = wasteData[searchTerm];
        matchedKey = searchTerm;
    } else {
        // Partial match check (e.g., "bottle" finds "plastic bottle")
        for (const key in wasteData) {
            if (key.includes(searchTerm)) {
                result = wasteData[key];
                matchedKey = key;
                break; // Stop at the first partial match
            }
        }
    }
    
    if (result) {
        let binColorClass = '';
        if (result.bin === 'green') binColorClass = 'bg-green-100 border-green-500 text-green-800';
        else if (result.bin === 'blue') binColorClass = 'bg-blue-100 border-blue-500 text-blue-800';
        else if (result.bin === 'hazardous') binColorClass = 'bg-red-100 border-red-500 text-red-800';

        wasteResultContainer.innerHTML = `
            <div class="p-4 rounded-lg border-l-4 ${binColorClass}">
                <h3 class="font-bold text-lg">${matchedKey.charAt(0).toUpperCase() + matchedKey.slice(1)}</h3>
                <p class="font-semibold mt-1">${result.type}</p>
                <p class="mt-2">${result.instruction}</p>
            </div>
        `;
    } else {
        wasteResultContainer.innerHTML = `
             <div class="p-4 rounded-lg border-l-4 bg-gray-100 border-gray-500 text-gray-800">
                <h3 class="font-bold text-lg">Result not found for "${searchTerm}"</h3>
                <p class="mt-2">Please check your spelling or try a more general term. For items not listed, it's safest to consult KMC guidelines directly.</p>
            </div>
        `;
    }
};

wasteSearchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        displayWasteResult(event.target.value);
    }
});

quickSearchButtons.forEach(button => {
    button.addEventListener('click', () => {
        const searchTerm = button.textContent;
        wasteSearchInput.value = searchTerm;
        displayWasteResult(searchTerm);
    });
});


// --- Scroll Animation Logic ---
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('is-visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // Trigger on load

// --- Back to Top Button Logic ---
const backToTopBtn = document.getElementById('back-to-top-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'translateY(0)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(10px)';
        setTimeout(() => {
            if (window.scrollY <= 300) {
                 backToTopBtn.classList.add('hidden');
            }
        }, 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

