import random
from datetime import datetime, timedelta

start_date = datetime.now() - timedelta(days=30)  # Start date for the data generation

data = []  # Array to store the generated data

for i in range(30):  # Generate data for 30 days

    # Generate random number of records for each day
    num_records = random.randint(50, 100)

    for _ in range(num_records):
        entry_time = start_date + timedelta(hours=random.randint(8, 18), minutes=random.randint(0, 59))
        exit_time = entry_time + timedelta(hours=random.randint(1, 6), minutes=random.randint(0, 59))
        slot_id = random.randint(137, 204)
        vehicle_number = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=8))

        # Create a dictionary representing a single record
        record = {
            'slotId': slot_id,
            'vehicleNumber': vehicle_number,
            'entryTime': entry_time.strftime('%Y-%m-%d %H:%M:%S'),
            'exitTime': exit_time.strftime('%Y-%m-%d %H:%M:%S')
        }

        data.append(record)

    # Increment the start date for the next day
    start_date += timedelta(days=1)

# Print the generated data as an array
print(data)