<script lang="ts">

  export let className: string;
  export let piece: string;

  function tileClick(): void {
    console.log(piece);
  }

</script>

<td on:click={tileClick} class={className}>{piece}</td>
