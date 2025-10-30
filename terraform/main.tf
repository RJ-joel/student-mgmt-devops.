# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "student_rg" {
  name     = "studentRG"
  location = "East US"
}

# Azure Container Registry (optional – already exists)
resource "azurerm_container_registry" "student_acr" {
  name                = "studentregistryjoel"
  resource_group_name = azurerm_resource_group.student_rg.name
  location            = azurerm_resource_group.student_rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Azure Kubernetes Service (AKS)
resource "azurerm_kubernetes_cluster" "student_aks" {
  name                = "studentAKSCluster"
  location            = azurerm_resource_group.student_rg.location
  resource_group_name = azurerm_resource_group.student_rg.name
  dns_prefix          = "studentaks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }

  depends_on = [azurerm_container_registry.student_acr]
}
