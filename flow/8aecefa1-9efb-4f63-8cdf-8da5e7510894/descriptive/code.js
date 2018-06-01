Wait.forField(Fields['CPR'], 60);
Fields["Ryd"].click();
if (Value !== "-") {
  Fields["CPR"].input(Value);
  Fields["Søg"].click();
}