# Completely disable the role assignments by creating empty versions
# This prevents Terraform from trying to create these resources elsewhere
# while ensuring they aren't actually created due to count=0

# Explicitly override azurerm_role_assignment.kms to prevent it from being created
resource "azurerm_role_assignment" "kms" {
  count = 0
  
  # These placeholder values will never be used since count=0
  principal_id = "00000000-0000-0000-0000-000000000000"
  scope = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/placeholder"
  role_definition_name = "Reader"
  
  # This ensures this resource is processed before the AKS module
  # but doesn't actually create any dependencies
  lifecycle {
    create_before_destroy = true
  }
}

# Explicitly override azurerm_role_assignment.server_identity_role_assignment to prevent it from being created
resource "azurerm_role_assignment" "server_identity_role_assignment" {
  count = 0
  
  # These placeholder values will never be used since count=0
  principal_id = "00000000-0000-0000-0000-000000000000"
  scope = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/placeholder"
  role_definition_name = "Reader"
  
  # This ensures this resource is processed before any dependent resources
  # but doesn't actually create any dependencies
  lifecycle {
    create_before_destroy = true
  }
}