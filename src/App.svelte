<script lang="ts">
  import { webSerialIsAvailable, isDocumentVisible } from "./lib/stores";

</script>

<main>
  <h1>Visibility Multi-Tab Demo</h1>

  <div class="card">
    <h2>Status</h2>
    <hr />
    <p>Document Visibility: {$isDocumentVisible}</p>
    <p>Web Serial Is Available: {$webSerialIsAvailable}</p>
  </div>
</main>
