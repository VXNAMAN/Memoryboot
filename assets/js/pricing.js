function updateProcessorOptions(location) {
  const processorSelect = document.getElementById('processor');
  const ram = parseInt(document.getElementById('ram').value);
  const months = document.getElementById('months').value;

  processorSelect.innerHTML = ""; // Clear processor options

  let processors = [];
  let perGbCost = 0;
  let discount = 0;

  switch (location) {
      case 'singapore':
          processors = ['AMD Ryzen 9 7900(5.4 GHz)'];
          perGbCost = 240;
          break;
      case 'europe':
          processors = ['AMD Ryzen 5 3900(4.6GHz)'];
          perGbCost = 80;
          break;
      case 'india':
          processors = ['Intel Xeon-E 2386G(4.7GHz)'];
          perGbCost = 250;
          break;
      default:
          break;
  }

  if (ram < 32) {
      ram = 32;
      document.getElementById('ram').value = ram;
  }

  processors.forEach((processor) => {
      const option = document.createElement('option');
      option.value = processor;
      option.textContent = processor;
      processorSelect.appendChild(option);
  });

  let totalCost = 0;

  if (months === '2' || months === '3' || months === '1' || months === '6') {
      totalCost = ram * perGbCost * months;

      if (months === '2') {
          discount = 0.05;
      } else if (months === '3') {
          discount = 0.1;
      } else if (months === '6') {
          discount = 0.15;
      }

      totalCost -= totalCost * discount;
  }

  const formattedCost = totalCost.toLocaleString('en-US', {
      style: 'currency',
      currency: 'INR'
  });

  document.getElementById('result').textContent = `Estimated Cost: ${formattedCost}`;
}

function incrementRam() {
  const input = document.getElementById('ram');
  const currentValue = parseInt(input.value);
  if (currentValue < 64) {
      input.value = currentValue + 1;
      updateProcessorOptions(document.getElementById('location').value);
  }
}

function decrementRam() {
  const input = document.getElementById('ram');
  const currentValue = parseInt(input.value);
  if (currentValue > 32) {
      input.value = currentValue - 1;
      updateProcessorOptions(document.getElementById('location').value);
  }
}

// Initial population of processor options based on selected location
document.getElementById('location').addEventListener('change', function() {
  const selectedLocation = this.value;
  updateProcessorOptions(selectedLocation);
});

// Update options and calculate cost when other fields change
document.querySelectorAll('input, select').forEach((element) => {
  element.addEventListener('change', function() {
      const selectedLocation = document.getElementById('location').value;
      updateProcessorOptions(selectedLocation);
  });
});
