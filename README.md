<h2>Project: E-commerce Database Schema Design</h2>

<h3>Problem Statement:</h3>
<p>You have been tasked with designing a comprehensive relational database schema for an e-commerce platform akin to Amazon. This platform will cater to both individual users and companies, facilitating the buying and selling of a diverse range of products. The system must be capable of managing user accounts, product listings, inventory, orders, discounts, and reviews, among other functionalities.</p>

<h3>Requirements:</h3>

<ul>
  <li>
    <h4>Users Table:</h4>
    <ul>
      <li>Each user should have a unique identifier (id).</li>
      <li>Users should provide their first name, last name, email (unique), and password.</li>
      <li>Users can belong to a company (optional), identified by companyId.</li>
      <li>Users can have a phone number associated with their account, identified by phoneId.</li>
      <li>Each user can be designated as an administrator (isAdmin) and whether their email is verified (isEmailVerified).</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Product Categories Table:</h4>
    <ul>
      <li>Product categories should have a unique identifier (id).</li>
      <li>Categories should have a name, description, optional parent category (parentId), and an image URL.</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Product Brands Table:</h4>
    <ul>
      <li>Product brands should have a unique identifier (id).</li>
      <li>Each brand should have a name, description, and timestamps for creation (createdAt) and last modification (modifiedAt).</li>
    </ul>
  </li>

  <li>
    <h4>User Addresses Table:</h4>
    <ul>
      <li>User addresses should have a unique identifier (id).</li>
      <li>Each address should be associated with a user (userId).</li>
      <li>Addresses should include street, unit, city, state (with foreign key stateId), ZIP code, and flags for billing (isBilling), primary (isPrimary), and deletable (isDeletable).</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>States Table:</h4>
    <ul>
      <li>States should have a unique identifier (id).</li>
      <li>Each state should have a name and a two-letter code.</li>
    </ul>
  </li>

  <li>
    <h4>Product Inventory Table:</h4>
    <ul>
      <li>Product inventory items should have a unique identifier (id).</li>
      <li>Each inventory item should track the quantity available.</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Companies Table:</h4>
    <ul>
      <li>Companies should have a unique identifier (id).</li>
      <li>Each company should have a name, type (typeId), and size (sizeId).</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Company Types Table:</h4>
    <ul>
      <li>Company types should have a unique identifier (id).</li>
      <li>Each type should have a name.</li>
    </ul>
  </li>

  <li>
    <h4>Company Sizes Table:</h4>
    <ul>
      <li>Company sizes should have a unique identifier (id).</li>
      <li>Each size should have a name.</li>
    </ul>
  </li>

  <li>
    <h4>Phone Numbers Table:</h4>
    <ul>
      <li>Phone numbers should have a unique identifier (id).</li>
      <li>Each phone number should be associated with a user (userId) or a company (companyId).</li>
      <li>Each phone number should have a verification status (isPhoneVerified).</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Email Verifications Table:</h4>
    <ul>
      <li>Email verifications should have a unique identifier (id).</li>
      <li>Each verification should be associated with a user (userId).</li>
      <li>Timestamps for creation should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Phone Verifications Table:</h4>
    <ul>
      <li>Phone verifications should have a unique identifier (id).</li>
      <li>Each verification should be associated with a user (userId).</li>
      <li>Timestamps for creation should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Discount Groups Table:</h4>
    <ul>
      <li>Discount groups should have a unique identifier (id).</li>
      <li>Each group should have a name and a ranking.</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Discounts Table:</h4>
    <ul>
      <li>Discounts should have a unique identifier (id).</li>
      <li>Each discount should be associated with a discount group (discountGroupId).</li>
      <li>Discounts should have a name, percentage, and activation status.</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Product Attributes Table:</h4>
    <ul>
      <li>Product attributes should have a unique identifier (id).</li>
      <li>Each attribute should have a name, display name, and options (stored as JSON).</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Products Table:</h4>
    <ul>
      <li>Products should have a unique identifier (id).</li>
      <li>Each product should have a name, description, specifications, category (categoryId), brand (brandId), inventory (inventoryId), and flags for activity, newness, and sponsorship.</li>
      <li>Images URLs and attribute IDs should be stored as JSON.</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>

  <li>
    <h4>Reviews Table:</h4>
    <ul>
      <li>Reviews should have a unique identifier (id).</li>
      <li>Each review should be associated with a product (productId) and a user (userId).</li>
      <li>Reviews should have a rating and an optional comment.</li>
      <li>Timestamps for creation (createdAt) and last modification (modifiedAt) should be recorded.</li>
    </ul>
  </li>
</ul>
